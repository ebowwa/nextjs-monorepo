// src/app/api/twitter/bookmarks/route.ts
import { NextResponse } from 'next/server';
import { fetchBookmarks } from '../../../../../(clientsubstrate)/components/Bookmarks/bookmarkService';
import { getFromCache, cacheData, getCacheKey } from './cache';

/**
 * Handles the GET request for the /api/bookmarks endpoint.
 * This endpoint fetches bookmarks from the Twitter API based on the provided query parameters.
 *
 * @param request - The incoming HTTP request object.
 * @returns A NextResponse object containing the fetched bookmarks or an error message.
 */
export async function GET(request: Request) {
  // Extract the query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || '';
  const maxResults = parseInt(searchParams.get('maxResults') || '10', 10);
  const expansions = searchParams.get('expansions') || undefined;
  const mediaFields = searchParams.get('mediaFields')?.split(',');
  const placeFields = searchParams.get('placeFields')?.split(',');
  const pollFields = searchParams.get('pollFields')?.split(',');
  const tweetFields = searchParams.get('tweetFields')?.split(',');
  const userFields = searchParams.get('userFields')?.split(',');
  const paginationToken = searchParams.get('paginationToken') || undefined;

  try {
    // Check if the bookmarks data is cached
    const cacheKey = getCacheKey(userId, maxResults, expansions, mediaFields, placeFields, pollFields, tweetFields, userFields, paginationToken);
    const cachedBookmarks = await getFromCache(cacheKey);
    if (cachedBookmarks) {
      return NextResponse.json(cachedBookmarks);
    }

    // Call the fetchBookmarks function from the bookmarkService module
    const bookmarks = await fetchBookmarks(
      userId,
      maxResults,
      expansions,
      mediaFields,
      placeFields,
      pollFields,
      tweetFields,
      userFields,
      paginationToken
    );

    // Cache the bookmarks data
    await cacheData(cacheKey, bookmarks);

    // Return the bookmarks as a JSON response
    return NextResponse.json(bookmarks);
  } catch (error) {
    // If an error occurs, log the error and return a 500 status code with an error message
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Error fetching bookmarks' }, { status: 500 });
  }
}