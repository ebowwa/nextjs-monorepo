// src/app/Bookmarks/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import BookmarkComponent from '../../../(clientsubstrate)/components/Bookmarks/bookmark';
import { Bookmark } from '../../../(clientsubstrate)/components/Bookmarks/Bookmark-types';

/**
 * A React component that fetches and renders a list of bookmarks.
 */
const BookmarksPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the bookmarks from the internal API endpoint
        const response = await fetch('/api/twitter/bookmarks?userId=1184909120685539328&maxResults=10');
        const data = await response.json();

        // Check if the response contains an error
        if (data.error) {
          setError(data.error);
          return;
        }

        // Set the fetched bookmarks in the component state
        setBookmarks(data);
      } catch (err) {
        // Handle any errors that occur during the API request
        setError('Error fetching bookmarks');
      }
    };

    fetchData();
  }, []);

  // If there is an error, display an error message
  if (error) {
    return <div>{error}</div>;
  }

  // If there are no bookmarks, display a message
  if (bookmarks.length === 0) {
    return <div>No bookmarks found.</div>;
  }

  // Render the BookmarkComponent with the fetched bookmarks
  return (
    <div>
      <BookmarkComponent bookmarks={bookmarks} />
    </div>
  );
};

export default BookmarksPage;