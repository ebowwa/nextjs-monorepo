// app/components/Bookmarks/Bookmarks.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { fetchBookmarks } from './bookmarkService';
import { Bookmark } from './Bookmark-types';
import BookmarkComponent from './bookmark';

const ParentComponent: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetBookmarks = async () => {
      try {
        const data = await fetchBookmarks(
          '1184909120685539328',
          10,
          'expansions',
          ['media.fields'],
          ['place.fields'],
          ['poll.fields'],
          ['tweet.fields'],
          ['user.fields']
        );
        setBookmarks(data);
        setNextToken(data.length > 0 ? data[data.length - 1].id : null);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchAndSetBookmarks();
  }, []);

  const fetchNextPage = async () => {
    if (nextToken) {
      try {
        const data = await fetchBookmarks(
          'YOUR_USER_ID',
          10,
          'expansions',
          ['media.fields'],
          ['place.fields'],
          ['poll.fields'],
          ['tweet.fields'],
          ['user.fields'],
          nextToken
        );
        setBookmarks((prevBookmarks) => [...prevBookmarks, ...data]);
        setNextToken(data.length > 0 ? data[data.length - 1].id : null);
      } catch (error) {
        console.error('Error fetching more bookmarks:', error);
      }
    }
  };

  return (
    <div>
      <BookmarkComponent bookmarks={bookmarks} />
      {nextToken && (
        <button onClick={fetchNextPage}>Load More Bookmarks</button>
      )}
    </div>
  );
};

export default ParentComponent;