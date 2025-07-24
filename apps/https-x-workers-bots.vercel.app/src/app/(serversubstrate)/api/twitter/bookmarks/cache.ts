// utils/cache.ts
import { NextResponse } from 'next/server';

// In-memory cache implementation
const cache = new Map<string, any>();

export async function getFromCache(key: string): Promise<any | null> {
  if (cache.has(key)) {
    return cache.get(key);
  }
  return null;
}

export async function cacheData(key: string, data: any): Promise<void> {
  cache.set(key, data);
}

export function getCacheKey(
  userId: string,
  maxResults: number,
  expansions?: string,
  mediaFields?: string[],
  placeFields?: string[],
  pollFields?: string[],
  tweetFields?: string[],
  userFields?: string[],
  paginationToken?: string
): string {
  return `bookmarks-${userId}-${maxResults}-${expansions}-${mediaFields?.join(',')}-${placeFields?.join(',')}-${pollFields?.join(',')}-${tweetFields?.join(',')}-${userFields?.join(',')}-${paginationToken}`;
}

