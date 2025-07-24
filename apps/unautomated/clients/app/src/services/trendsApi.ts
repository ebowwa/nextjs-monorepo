import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for iOS simulator and 10.0.2.2 for Android emulator
const API_BASE_URL = Platform.select({
  ios: 'http://localhost:8000/api',
  android: 'http://10.0.2.2:8000/api',
  default: 'http://localhost:8000/api',
});

// Common types
export interface TrendResult {
  timestamp: string;
  value: number;
}

export interface RelatedQuery {
  query: string;
  value: number | string;  
}

export interface RelatedQueriesData {
  top: RelatedQuery[];
  rising: RelatedQuery[];
}

export interface RelatedTopic {
  title: string;
  type: string;
  value: number;
}

export interface RegionInterest {
  region: string;
  value: number;
  geo_code?: string;
}

export interface Suggestion {
  title: string;
  type: string;
  mid?: string;
}

export interface TrendsApiResponse<T> {
  data: T;
  message: string;
  source: 'api' | 'cache';
}

// API Parameters interface
interface TrendsParams {
  timeframe?: string;
  geo?: string;
  gprop?: string;
}

// API client with enhanced error handling and type safety
const createApiClient = () => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Add response interceptor for logging
  client.interceptors.response.use(
    response => {
      console.log(`API Response [${response.config.url}]:`, response.data);
      return response;
    },
    error => {
      console.error('API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
      });
      return Promise.reject(error);
    }
  );

  return client;
};

const api = createApiClient();

export const TrendsApi = {
  async getInterestOverTime(
    keyword: string,
    params: TrendsParams = {}
  ): Promise<TrendsApiResponse<TrendResult[]>> {
    const response = await api.get(`/trends/${encodeURIComponent(keyword)}`, { params });
    return {
      data: response.data.trends,
      message: response.data.message,
      source: response.data.source,
    };
  },

  async getRelatedQueries(
    keyword: string,
    params: TrendsParams = {}
  ): Promise<TrendsApiResponse<RelatedQueriesData>> {
    const response = await api.get(`/trends/${encodeURIComponent(keyword)}/related_queries`, { params });
    const data = response.data.data || response.data;
    return {
      data: {
        top: data.top || [],
        rising: data.rising || []
      },
      message: response.data.message || 'Success',
      source: response.data.source || 'api',
    };
  },

  async getRelatedTopics(
    keyword: string,
    params: TrendsParams = {}
  ): Promise<TrendsApiResponse<RelatedTopic[]>> {
    const response = await api.get(`/trends/${encodeURIComponent(keyword)}/related_topics`, { params });
    return {
      data: response.data.related_topics,
      message: response.data.message,
      source: response.data.source,
    };
  },

  async getInterestByRegion(
    keyword: string,
    resolution: 'COUNTRY' | 'REGION' | 'CITY' | 'DMA' = 'COUNTRY',
    params: TrendsParams & {
      inc_low_vol?: boolean;
      inc_geo_code?: boolean;
    } = {}
  ): Promise<TrendsApiResponse<RegionInterest[]>> {
    const response = await api.get(`/trends/${encodeURIComponent(keyword)}/interest_by_region`, {
      params: { resolution, ...params },
    });
    return {
      data: response.data.interest_by_region,
      message: response.data.message,
      source: response.data.source,
    };
  },

  async getSuggestions(keyword: string): Promise<TrendsApiResponse<Suggestion[]>> {
    const response = await api.get(`/trends/${encodeURIComponent(keyword)}/suggestions`);
    return {
      data: response.data.suggestions,
      message: response.data.message,
      source: response.data.source,
    };
  },

  async getMultipleSuggestions(keywords: string[]): Promise<TrendsApiResponse<Record<string, Suggestion[]>>> {
    const response = await api.get('/trends/suggestions', {
      params: { keywords: keywords.join(',') },
    });
    return {
      data: response.data.suggestions,
      message: response.data.message,
      source: response.data.source,
    };
  },

  async getTopCharts(
    year: number,
    params: { geo?: string; category?: number } = {}
  ): Promise<TrendsApiResponse<any[]>> {
    const response = await api.get('/trends/top_charts', {
      params: { year, ...params },
    });
    return {
      data: response.data.top_charts,
      message: response.data.message,
      source: response.data.source,
    };
  },
};
