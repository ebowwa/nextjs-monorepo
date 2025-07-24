from openai import AsyncOpenAI
import json
import logging
import os
from pydantic import BaseModel, Field
from typing import List, Any
from dotenv import load_dotenv
from fastapi import HTTPException

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# OpenAI configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_API_BASE = os.getenv('OPENAI_API_BASE')

class QueryItem(BaseModel):
    query: str
    value: Any

class RelatedQueriesResponse(BaseModel):
    top: List[QueryItem] = Field(
        description="Top related queries with relevance scores",
        min_items=1,
        max_items=10
    )
    rising: List[QueryItem] = Field(
        description="Rising related queries with percentage increases",
        min_items=1,
        max_items=10
    )

class ProductDetails(BaseModel):
    design_title: str = Field(..., max_length=60, min_length=3)
    brand: str = Field(..., max_length=50, min_length=3)
    feature_bullet1: str = Field(..., max_length=256)
    feature_bullet2: str = Field(..., max_length=256)
    product_description: str = Field(..., max_length=2000, min_length=75)

class OpenAIClient:
    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=OPENAI_API_KEY,
            base_url=OPENAI_API_BASE
        )
        self.model = "gpt-4o-mini"
        
    async def get_related_queries(self, keyword: str) -> RelatedQueriesResponse:
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a market research analyst. Always respond with valid JSON."},
                    {"role": "user", "content": f"Analyze the search term '{keyword}' and provide related queries in this exact JSON format: {{\"top\": [{{\"query\": string, \"value\": number}}, ...], \"rising\": [{{\"query\": string, \"value\": string}}, ...]}}. Top queries should have values 0-100, rising queries should have percentage strings like '+130%' or 'Breakout'."}
                ],
                temperature=0.7,
                response_format={"type": "json_object"},
                max_tokens=500
            )
            
            content = response.choices[0].message.content
            logger.info(f"OpenAI response content: {content}")
            
            try:
                result = json.loads(content)
                # Validate against our Pydantic model
                validated_response = RelatedQueriesResponse(**result)
                return validated_response

            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse OpenAI response: {e}")
                logger.error(f"Raw content: {content}")
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

        except Exception as e:
            logger.error(f"Error in OpenAI request: {str(e)}")
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

    async def generate_product_details(self, design_concept: str) -> ProductDetails:
        """Generate product details for Amazon Merch listings."""
        try:
            system_prompt = """You are an expert in creating compelling product listings for Amazon Merch.
Your task is to generate product details that are:
1. SEO-optimized with relevant keywords
2. Engaging and appealing to potential customers
3. Compliant with Amazon's character limits and guidelines
4. Unique and creative while being market-relevant

For t-shirt designs, focus on:
- Catchy, searchable titles that describe the design
- Professional brand names that reflect the design style
- Clear, benefit-focused bullet points
- Detailed descriptions that highlight design features and target audience"""

            user_prompt = f"""Create a complete product listing for a t-shirt with the concept: '{design_concept}'

Strictly follow these format requirements:
1. Design Title (3-60 chars): Catchy, searchable, includes main keywords
2. Brand Name (3-50 chars): Professional, memorable, relevant to design
3. Feature Bullets (max 256 chars each):
   - Bullet 1: Focus on design features and quality
   - Bullet 2: Focus on occasions and target audience
4. Product Description (75-2000 chars): Comprehensive, engaging, includes keywords

Return ONLY a JSON object with these exact fields:
{
    "design_title": "string",
    "brand": "string",
    "feature_bullet1": "string",
    "feature_bullet2": "string",
    "product_description": "string"
}"""

            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                response_format={"type": "json_object"},
                max_tokens=1000
            )
            
            content = response.choices[0].message.content
            logger.info(f"OpenAI product details response: {content}")
            
            try:
                result = json.loads(content)
                # Pre-validate lengths before creating model
                if not (3 <= len(result.get('design_title', '')) <= 60):
                    raise ValueError("Design title must be between 3 and 60 characters")
                if not (3 <= len(result.get('brand', '')) <= 50):
                    raise ValueError("Brand must be between 3 and 50 characters")
                if len(result.get('feature_bullet1', '')) > 256:
                    raise ValueError("Feature bullet 1 exceeds 256 characters")
                if len(result.get('feature_bullet2', '')) > 256:
                    raise ValueError("Feature bullet 2 exceeds 256 characters")
                if not (75 <= len(result.get('product_description', '')) <= 2000):
                    raise ValueError("Product description must be between 75 and 2000 characters")
                
                validated_response = ProductDetails(**result)
                return validated_response

            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse OpenAI product details response: {e}")
                logger.error(f"Raw content: {content}")
                raise HTTPException(
                    status_code=500,
                    detail="Failed to generate valid product details format"
                )
            except ValueError as e:
                logger.error(f"Validation error in product details: {str(e)}")
                raise HTTPException(
                    status_code=400,
                    detail=f"Generated content validation error: {str(e)}"
                )

        except Exception as e:
            logger.error(f"Error in OpenAI product details request: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to generate product details: {str(e)}"
            )
