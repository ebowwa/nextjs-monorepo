// src/components/Bookmarks/bookmarkService.ts
import { Bookmark } from './Bookmark-types';

export const fetchBookmarks = async (
  userId: string,
  maxResults: number,
  expansions?: string,
  mediaFields?: string[],
  placeFields?: string[],
  pollFields?: string[],
  tweetFields?: string[],
  userFields?: string[],
  paginationToken?: string | undefined
): Promise<Bookmark[]> => {
  try {
    // Construct the API endpoint URL
    let url = `https://api.twitter.com/2/users/${userId}/bookmarks?max_results=${maxResults}`;

    // Add optional query parameters to the URL
    if (expansions) url += `&expansions=${expansions}`;
    if (mediaFields) url += `&media.fields=${mediaFields.join(',')}`;
    if (placeFields) url += `&place.fields=${placeFields.join(',')}`;
    if (pollFields) url += `&poll.fields=${pollFields.join(',')}`;
    if (tweetFields) url += `&tweet.fields=${tweetFields.join(',')}`;
    if (userFields) url += `&user.fields=${userFields.join(',')}`;
    if (paginationToken) url += `&pagination_token=${paginationToken}`;

    // Make the API request
    const response = await fetch(url, {
      headers: {
        // Include the Twitter Bearer token in the Authorization header
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    // Parse the JSON response
    const data = await response.json();

    // Map the response data to the Bookmark type
    const bookmarks: Bookmark[] = data.data.map((item: any) => ({
      id: item.id,
      // Map other properties from the response to the Bookmark type
    }));

    // Return the mapped bookmarks
    return bookmarks;
  } catch (error) {
    // If an error occurs, throw it
    throw error;
  }
};