from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pytrends.request import TrendReq
import pandas as pd
from typing import List, Dict, Any, Optional
import json
import logging
import time
import asyncio
from datetime import datetime, timedelta
import redis.asyncio as redis
import pickle
import os
from dotenv import load_dotenv
import requests
from urllib.parse import quote
from openai_client import OpenAIClient, RelatedQueriesResponse, QueryItem, ProductDetails
from pydantic import BaseModel, Field
from supabase import create_client, Client
import base64
import io
from PIL import Image
from fastapi import UploadFile, File, Form
import os
from pathlib import Path
from fastapi import UploadFile, File, Form
import boto3
from botocore.exceptions import ClientError
import time
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')

# Load environment variables
load_dotenv(dotenv_path=env_path)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Redis configuration
redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
redis_pool = redis.ConnectionPool.from_url(redis_url, decode_responses=False)

# OpenAI configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_API_BASE = os.getenv('OPENAI_API_BASE')

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# AWS S3 client setup
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)
S3_BUCKET = os.getenv('AWS_S3_BUCKET')

app = FastAPI(
    title="PyTrends FastAPI Integration",
    description="An API service that leverages PyTrends to fetch Google Trends data with caching and rate limiting.",
    version="1.0.0"
)

# Add CORS middleware with specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting configuration
RATE_LIMIT_DURATION = timedelta(minutes=5)
MAX_REQUESTS = 100
request_history = {}

# Cache configuration
CACHE_EXPIRATION = 60 * 60 * 24  # 24 hours in seconds

class TrendsCache:
    def __init__(self, cache_file='trends_cache.pkl'):
        self.cache_file = cache_file
        self.cache = self._load_cache()

    def _load_cache(self):
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'rb') as f:
                    return pickle.load(f)
            except Exception as e:
                logger.error(f"Error loading cache: {e}")
                return {}
        return {}

    def _save_cache(self):
        try:
            with open(self.cache_file, 'wb') as f:
                pickle.dump(self.cache, f)
        except Exception as e:
            logger.error(f"Error saving cache: {e}")

    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < timedelta(hours=24):
                return data
            else:
                del self.cache[key]
                self._save_cache()
        return None

    def set(self, key, value):
        self.cache[key] = (value, datetime.now())
        self._save_cache()

# Initialize cache
trends_cache = TrendsCache()

async def get_redis() -> redis.Redis:
    """Get Redis connection from pool"""
    return redis.Redis(connection_pool=redis_pool)

async def get_cached_data(key: str) -> Optional[Dict]:
    """Get data from Redis cache."""
    try:
        async with redis.Redis(connection_pool=redis_pool) as redis_client:
            data = await redis_client.get(key)
            if data:
                return pickle.loads(data)
    except Exception as e:
        logger.error(f"Error getting data from cache: {str(e)}")
    return None

async def set_cached_data(key: str, data: Any, expiration: int = CACHE_EXPIRATION):
    """Set data in Redis cache."""
    try:
        async with redis.Redis(connection_pool=redis_pool) as redis_client:
            await redis_client.setex(
                key,
                expiration,
                pickle.dumps(data)
            )
    except Exception as e:
        logger.error(f"Error setting data in cache: {str(e)}")

async def check_rate_limit(client_ip: str) -> bool:
    """Check if the client has exceeded rate limits"""
    now = datetime.now()
    if client_ip in request_history:
        requests = request_history[client_ip]
        # Remove old requests
        requests = [req_time for req_time in requests if now - req_time < RATE_LIMIT_DURATION]
        request_history[client_ip] = requests
        if len(requests) >= MAX_REQUESTS:
            return False
    else:
        request_history[client_ip] = []
    request_history[client_ip].append(now)
    return True

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    if not await check_rate_limit(client_ip):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    response = await call_next(request)
    return response

@app.on_event("startup")
async def startup_event():
    """Initialize Redis connection on startup"""
    try:
        redis_client = await get_redis()
        await redis_client.ping()
        logger.info("Successfully connected to Redis")
    except Exception as e:
        logger.error(f"Failed to connect to Redis: {str(e)}")
        raise

@app.get("/", summary="Health Check", tags=["Health"])
async def root():
    """
    Root endpoint for health checking.
    """
    return {"status": "ok", "message": "PyTrends FastAPI Integration is running"}

@app.get("/api/trends/{keyword}", summary="Get Interest Over Time", tags=["Trends"])
async def get_trends(keyword: str, request: Request, timeframe: str = 'today 12-m', geo: str = '', gprop: str = ''):
    """
    Retrieve interest over time data for a given keyword.
    
    - **keyword**: The keyword to fetch trends for.
    - **timeframe**: Time range for the data (default: 'today 12-m').
    - **geo**: Geographic region (default: global).
    - **gprop**: Google property to filter (default: web searches).
    """
    try:
        logger.info(f"Fetching interest over time for keyword: {keyword}")
        
        # Construct cache key with parameters
        cache_key = f"trends:interest_over_time:{keyword}:{timeframe}:{geo}:{gprop}"
        cached_data = await get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            return {**cached_data, "source": "cache"}
        
        # Add delay to avoid rate limiting
        await asyncio.sleep(1)
        
        try:
            # Build payload
            pytrends = TrendReq(hl='en-US', tz=360)
            pytrends.build_payload([keyword], timeframe=timeframe, geo=geo, gprop=gprop)
            logger.debug("Payload built successfully")
        except Exception as e:
            logger.error(f"Error building payload: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to build trends payload")
        
        try:
            # Fetch interest over time data
            interest_over_time_df = pytrends.interest_over_time()
            logger.debug("Interest over time data retrieved successfully")
        except Exception as e:
            logger.error(f"Error fetching interest over time data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch interest over time data")
        
        if interest_over_time_df is None or interest_over_time_df.empty:
            logger.warning("No interest over time data found")
            return {
                "trends": [],
                "message": "No interest over time data available for the given keyword"
            }
         
        # Process data
        trends_data = [
            {"timestamp": index.strftime("%Y-%m-%d"), "value": int(row[keyword])}
            for index, row in interest_over_time_df.iterrows()
            if keyword in row and not pd.isna(row[keyword])
        ]
        
        response_data = {
            "trends": trends_data,
            "message": "Interest over time data fetched successfully",
            "source": "api"
        }
        
        # Cache the response
        await set_cached_data(cache_key, response_data)
        
        logger.info("Interest over time data processed and cached successfully")
        return response_data
        
    except Exception as e:
        logger.error(f"Error processing /api/trends/{keyword}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/trends/{keyword}/interest_by_region", summary="Get Interest by Region", tags=["Trends"])
async def get_interest_by_region(keyword: str, request: Request, resolution: str = 'COUNTRY', inc_low_vol: bool = True, inc_geo_code: bool = False, timeframe: str = 'today 12-m', geo: str = '', gprop: str = ''):
    """
    Retrieve interest by region data for a given keyword.
    
    - **keyword**: The keyword to fetch interest by region for.
    - **resolution**: 'CITY', 'COUNTRY', 'DMA', or 'REGION' (default: 'COUNTRY').
    - **inc_low_vol**: Include low volume regions (default: True).
    - **inc_geo_code**: Include ISO codes of regions (default: False).
    - **timeframe**: Time range for the data (default: 'today 12-m').
    - **geo**: Geographic region (default: global).
    - **gprop**: Google property to filter (default: web searches).
    """
    try:
        logger.info(f"Fetching interest by region for keyword: {keyword}")
        
        # Validate resolution
        valid_resolutions = ['CITY', 'COUNTRY', 'DMA', 'REGION']
        if resolution not in valid_resolutions:
            logger.error(f"Invalid resolution parameter: {resolution}")
            raise HTTPException(status_code=400, detail=f"Invalid resolution. Choose from {valid_resolutions}")
        
        # Construct cache key with parameters
        cache_key = f"trends:interest_by_region:{keyword}:{timeframe}:{geo}:{gprop}:{resolution}:{inc_low_vol}:{inc_geo_code}"
        cached_data = await get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            return {**cached_data, "source": "cache"}
        
        # Add delay to avoid rate limiting
        await asyncio.sleep(1)
        
        try:
            # Build payload
            pytrends = TrendReq(hl='en-US', tz=360)
            pytrends.build_payload([keyword], timeframe=timeframe, geo=geo, gprop=gprop)
            logger.debug("Payload built successfully")
        except Exception as e:
            logger.error(f"Error building payload: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to build trends payload")
        
        try:
            # Fetch interest by region
            interest_by_region_df = pytrends.interest_by_region(resolution=resolution, inc_low_vol=inc_low_vol, inc_geo_code=inc_geo_code)
            logger.debug("Interest by region data retrieved successfully")
        except Exception as e:
            logger.error(f"Error fetching interest by region data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch interest by region data")
        
        if interest_by_region_df is None or interest_by_region_df.empty:
            logger.warning("No interest by region data found")
            return {
                "interest_by_region": [],
                "message": "No interest by region data available for the given keyword"
            }
        
        # Process data
        if inc_geo_code:
            # Include geo codes
            regions = interest_by_region_df.index.tolist()
            values = interest_by_region_df[keyword].tolist()
            geo_codes = interest_by_region_df['geoCode'].tolist() if 'geoCode' in interest_by_region_df.columns else [None]*len(regions)
            interest_by_region = [
                {"region": region, "geo_code": geo_code, "value": int(value)}
                for region, geo_code, value in zip(regions, geo_codes, values)
                if not pd.isna(value)
            ]
        else:
            regions = interest_by_region_df.index.tolist()
            values = interest_by_region_df[keyword].tolist()
            interest_by_region = [
                {"region": region, "value": int(value)}
                for region, value in zip(regions, values)
                if not pd.isna(value)
            ]
        
        response_data = {
            "interest_by_region": interest_by_region,
            "message": "Interest by region data fetched successfully",
            "source": "api"
        }
        
        # Cache the response
        await set_cached_data(cache_key, response_data)
        
        logger.info("Interest by region data processed and cached successfully")
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing /api/trends/{keyword}/interest_by_region: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/trends/{keyword}/related_topics", summary="Get Related Topics", tags=["Trends"])
async def get_related_topics(keyword: str, request: Request, timeframe: str = 'today 12-m', geo: str = '', gprop: str = ''):
    """
    Retrieve related topics for a given keyword.
    
    - **keyword**: The keyword to fetch related topics for.
    - **timeframe**: Time range for the data (default: 'today 12-m').
    - **geo**: Geographic region (default: global).
    - **gprop**: Google property to filter (default: web searches).
    """
    try:
        logger.info(f"Fetching related topics for keyword: {keyword}")
        
        # Construct cache key with parameters
        cache_key = f"trends:related_topics:{keyword}:{timeframe}:{geo}:{gprop}"
        cached_data = await get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            return {**cached_data, "source": "cache"}
        
        # Add delay to avoid rate limiting
        await asyncio.sleep(1)
        
        try:
            # Build payload
            pytrends = TrendReq(hl='en-US', tz=360)
            pytrends.build_payload([keyword], timeframe=timeframe, geo=geo, gprop=gprop)
            logger.debug("Payload built successfully")
        except Exception as e:
            logger.error(f"Error building payload: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to build trends payload")
        
        try:
            # Fetch related topics
            related_topics_dict = pytrends.related_topics()
            logger.debug("Related topics data retrieved successfully")
        except Exception as e:
            logger.error(f"Error fetching related topics data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch related topics data")
        
        if not related_topics_dict or keyword not in related_topics_dict:
            logger.warning("No related topics data found")
            return {
                "related_topics": [],
                "message": "No related topics data available for the given keyword"
            }
        
        related_topics = related_topics_dict[keyword].get('top')
        if related_topics is not None and not related_topics.empty:
            related_topics_list = related_topics.to_dict(orient='records')[:10]
        else:
            related_topics_list = []
        
        response_data = {
            "related_topics": related_topics_list,
            "message": "Related topics data fetched successfully",
            "source": "api"
        }
        
        # Cache the response
        await set_cached_data(cache_key, response_data)
        
        logger.info("Related topics data processed and cached successfully")
        return response_data
        
    except Exception as e:
        logger.error(f"Error processing /api/trends/{keyword}/related_topics: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/trends/{keyword}/suggestions", summary="Get Suggestions", tags=["Suggestions"])
async def get_suggestions(keyword: str, request: Request):
    """
    Retrieve keyword suggestions to refine a trend search.
    
    - **keyword**: The keyword to get suggestions for.
    """
    try:
        logger.info(f"Fetching suggestions for keyword: {keyword}")
        
        # Construct cache key with parameters
        cache_key = f"trends:suggestions:{keyword}"
        cached_data = await get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            return {**cached_data, "source": "cache"}
        
        # Add delay to avoid rate limiting
        await asyncio.sleep(1)
        
        try:
            # Fetch suggestions
            pytrends = TrendReq(hl='en-US', tz=360)
            suggestions = pytrends.suggestions(keyword)
            logger.debug("Suggestions data retrieved successfully")
        except Exception as e:
            logger.error(f"Error fetching suggestions data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch suggestions data")
        
        response_data = {
            "suggestions": suggestions,
            "message": "Suggestions data fetched successfully",
            "source": "api"
        }
        
        # Cache the response
        await set_cached_data(cache_key, response_data)
        
        logger.info("Suggestions data processed and cached successfully")
        return response_data
        
    except Exception as e:
        logger.error(f"Error processing /api/trends/{keyword}/suggestions: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/trends/top_charts", summary="Get Top Charts", tags=["Top Charts"])
async def get_top_charts(year: int, geo: str = 'GLOBAL', category: int = 0):
    """
    Retrieve top charts data for a specific year and category.
    
    - **year**: The year for which to retrieve top charts (e.g., 2019).
    - **geo**: Geographic region (default: 'GLOBAL').
    - **category**: Category to narrow results (default: 0, which means no category).
    """
    try:
        logger.info(f"Fetching top charts for year: {year}, geo: {geo}, category: {category}")
        
        # Construct cache key with parameters
        cache_key = f"trends:top_charts:{year}:{geo}:{category}"
        cached_data = await get_cached_data(cache_key)
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            return {**cached_data, "source": "cache"}
        
        # Add delay to avoid rate limiting
        await asyncio.sleep(1)
        
        try:
            # Fetch top charts
            pytrends = TrendReq(hl='en-US', tz=360)
            top_charts_df = pytrends.top_charts(year, hl='en-US', tz=300, geo=geo, cat=category)
            logger.debug("Top charts data retrieved successfully")
        except Exception as e:
            logger.error(f"Error fetching top charts data: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to fetch top charts data")
        
        if top_charts_df is None or top_charts_df.empty:
            logger.warning("No top charts data found")
            return {
                "top_charts": [],
                "message": "No top charts data available for the given parameters"
            }
        
        # Process data
        top_charts = top_charts_df.to_dict(orient='records')
        
        response_data = {
            "top_charts": top_charts,
            "message": "Top charts data fetched successfully",
            "source": "api"
        }
        
        # Cache the response
        await set_cached_data(cache_key, response_data)
        
        logger.info("Top charts data processed and cached successfully")
        return response_data
        
    except Exception as e:
        logger.error(f"Error processing /api/trends/top_charts: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/trends/suggestions", summary="Get Suggestions for Multiple Keywords", tags=["Suggestions"])
async def get_suggestions_multiple(keywords: List[str]):
    """
    Retrieve keyword suggestions for multiple keywords.
    
    - **keywords**: List of keywords to get suggestions for.
    """
    try:
        logger.info(f"Fetching suggestions for multiple keywords: {keywords}")
        all_suggestions = {}
        
        for keyword in keywords:
            cache_key = f"trends:suggestions:{keyword}"
            cached_data = await get_cached_data(cache_key)
            if cached_data:
                logger.info(f"Cache hit for key: {cache_key}")
                all_suggestions[keyword] = cached_data.get("suggestions", [])
                continue
            
            # Add delay to avoid rate limiting
            await asyncio.sleep(1)
            
            try:
                pytrends = TrendReq(hl='en-US', tz=360)
                suggestions = pytrends.suggestions(keyword)
                logger.debug(f"Suggestions retrieved for keyword: {keyword}")
            except Exception as e:
                logger.error(f"Error fetching suggestions for keyword {keyword}: {str(e)}")
                all_suggestions[keyword] = []
                continue
            
            all_suggestions[keyword] = suggestions
            
            # Cache the response
            response_data = {
                "suggestions": suggestions,
                "message": "Suggestions data fetched successfully",
                "source": "api"
            }
            await set_cached_data(cache_key, response_data)
        
        return {
            "suggestions": all_suggestions,
            "message": "Suggestions data fetched successfully",
            "source": "api"
        }
        
    except Exception as e:
        logger.error(f"Error processing /api/trends/suggestions_multiple: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/trends/{keyword}/related_queries", summary="Get Related Queries", tags=["Trends"], response_model=RelatedQueriesResponse)
async def get_related_queries(keyword: str, request: Request):
    """
    Retrieve related queries for a given keyword using OpenAI's API.
    Returns structured data validated against RelatedQueriesResponse schema.
    
    - **keyword**: The keyword to fetch related queries for
    """
    try:
        logger.info(f"Fetching related queries for keyword: {keyword}")
        
        # Construct cache key
        cache_key = f"trends:related_queries:{keyword}"
        cached_data = await get_cached_data(cache_key)
        
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            try:
                # Handle old cache format
                if isinstance(cached_data, dict) and "data" in cached_data:
                    cached_data = cached_data["data"]
                # Validate cached data against our schema
                return RelatedQueriesResponse(
                    top=[QueryItem(**item) if isinstance(item, dict) else item for item in cached_data.get("top", [])],
                    rising=[QueryItem(**item) if isinstance(item, dict) else item for item in cached_data.get("rising", [])]
                )
            except Exception as e:
                logger.error(f"Error parsing cached data: {str(e)}")
                # If cache data is invalid, fetch fresh data
                cached_data = None
        
        if not cached_data:
            # Get fresh data from OpenAI
            openai_client = OpenAIClient()
            response_data = await openai_client.get_related_queries(keyword)
            
            # Cache the validated response
            await set_cached_data(cache_key, response_data.dict())
            
            return response_data
        
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error in related queries endpoint: {error_msg}")
        # Return a valid fallback response that matches our schema
        return RelatedQueriesResponse(
            top=[
                QueryItem(query=f"{keyword} services", value=100),
                QueryItem(query=f"{keyword} business", value=85)
            ],
            rising=[
                QueryItem(query=f"{keyword} trends", value="Breakout"),
                QueryItem(query=f"{keyword} market", value="+150%")
            ]
        )

@app.post("/api/product/generate-details", summary="Generate Product Details", tags=["Product"], response_model=ProductDetails)
async def generate_product_details(design_concept: str):
    """
    Generate product details for Amazon Merch listings.
    
    - **design_concept**: The concept or idea for the t-shirt design
    """
    try:
        logger.info(f"Generating product details for concept: {design_concept}")
        
        # Construct cache key
        cache_key = f"product:details:{design_concept}"
        cached_data = await get_cached_data(cache_key)
        
        if cached_data:
            logger.info(f"Cache hit for key: {cache_key}")
            return ProductDetails(**cached_data)
        
        # Get fresh data from OpenAI
        openai_client = OpenAIClient()
        response_data = await openai_client.generate_product_details(design_concept)
        
        # Cache the validated response
        await set_cached_data(cache_key, response_data.dict())
        
        return response_data
        
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error in product details generation: {error_msg}")
        raise HTTPException(status_code=500, detail=f"Failed to generate product details: {error_msg}")

class ImageUploadResponse(BaseModel):
    image_url: str
    product_details: ProductDetails

@app.post("/api/upload/image", response_model=ImageUploadResponse, tags=["Upload"])
async def upload_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    username: str = Form(...)
):
    """
    Upload an image to AWS S3 and generate product details.
    
    - **file**: The image file to upload
    - **title**: Title for the design
    - **username**: Username of the uploader
    """
    try:
        # Read file contents
        contents = await file.read()
        
        # Generate unique S3 key
        timestamp = int(time.time())
        file_ext = os.path.splitext(file.filename)[1]
        s3_key = f"designs/{username}/{title}_{timestamp}{file_ext}"
        
        # Upload to S3
        try:
            s3_client.put_object(
                Bucket=S3_BUCKET,
                Key=s3_key,
                Body=contents,
                ContentType=file.content_type
            )
            
            # Generate presigned URL for immediate access
            url = s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': S3_BUCKET, 'Key': s3_key},
                ExpiresIn=3600  # URL expires in 1 hour
            )
            
        except ClientError as e:
            logger.error(f"Error uploading to S3: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Failed to upload image to S3"
            )
        
        # Convert to base64 for OpenAI
        image = Image.open(io.BytesIO(contents))
        buffered = io.BytesIO()
        image.save(buffered, format=image.format)
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        # Generate product details using OpenAI
        openai_client = OpenAIClient()
        product_details = await openai_client.generate_product_details(title)
        
        return ImageUploadResponse(
            image_url=url,
            product_details=product_details
        )
        
    except Exception as e:
        logger.error(f"Error processing image upload: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process image upload: {str(e)}"
        )

# Additional endpoints can be added here following the same pattern to utilize other PyTrends functionalities

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
