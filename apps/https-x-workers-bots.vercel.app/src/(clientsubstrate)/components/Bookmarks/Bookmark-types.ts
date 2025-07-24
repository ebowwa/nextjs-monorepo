// src/components/Bookmarks/Bookmark-types.ts

/**
 * Defines the properties for fetching bookmarks from the Twitter API.
 */
export interface BookmarkProps {
  // The user ID for whom to fetch bookmarks
  userId: string;

  // The maximum number of results to return (optional)
  maxResults?: number;

  // A string of comma-separated expansion fields to include in the response (optional)
  expansions?: string;

  // Arrays of strings representing the fields to include for various entities (optional)
  mediaFields?: string[];
  placeFields?: string[];
  pollFields?: string[];
  tweetFields?: string[];
  userFields?: string[];

  // A pagination token to fetch the next set of results (optional)
  paginationToken?: string;

  // A callback function to be called when the bookmarks are loaded (optional)
  onBookmarksLoaded?: (bookmarks: Bookmark[]) => void;

  // A callback function to be called if an error occurs (optional)
  onError?: (error: Error) => void;

  // A flag indicating whether the bookmarks should be saved to a file (optional)
  saveToFile?: boolean;

  // The file path where the bookmarks should be saved (optional)
  filePath?: string;
}

/**
 * Defines the structure of a bookmark returned by the Twitter API.
 */
export interface Bookmark {
  // The unique identifier of the bookmark
  id: string;

  // The text content of the tweet
  text: string;

  // The timestamp when the tweet was created
  createdAt: string;

  // The source of the tweet
  tweetSource: string;

  // The source of the bookmark (optional)
  source?: string;

  // The edit history of the tweet
  editHistory: string[];

  // Information about the edit controls for the tweet
  editControls: {
    isEditEligible: boolean;
    editableUntil: string;
    editsRemaining: number;
  };

  // The unique identifier of the conversation the tweet is part of
  conversationId: string;

  // Information about a note tweet associated with the bookmark (optional)
  noteTweet?: {
    text: string;
    entities: {
      urls: any[];
      mentions: any[];
      hashtags: any[];
      cashtags: any[];
    };
    source?: string;
  };

  // Information about tweets that are referenced by the bookmark (optional)
  referencedTweets?: {
    type: 'retweeted' | 'quoted' | 'replied_to';
    id: string;
  }[];

  // Information about media and poll attachments in the tweet (optional)
  attachments?: {
    mediaKeys: string[];
    pollIds: string[];
  };

  // Information about the geographical location of the tweet (optional)
  geo?: {
    coordinates: {
      type: 'Point';
      coordinates: [number, number];
    };
    placeId: string;
  };

  // Information about the context of the tweet (optional)
  contextAnnotations?: {
    domain: {
      id: string;
      name: string;
      description: string;
    };
    entity: {
      id: string;
      name: string;
      description: string;
    };
  }[];

  // Information about the entities (URLs, hashtags, mentions, etc.) in the tweet (optional)
  entities?: {
    annotations: {
      start: number;
      end: number;
      probability: number;
      type: string;
      normalizedText: string;
    }[];
    urls: {
      start: number;
      end: number;
      url: string;
      expandedUrl: string;
      displayUrl: string;
      unwoundUrl: string;
    }[];
    hashtags: {
      start: number;
      end: number;
      tag: string;
    }[];
    mentions: {
      start: number;
      end: number;
      username: string;
    }[];
    cashtags: {
      start: number;
      end: number;
      tag: string;
    }[];
  };

  // Information about content that has been withheld from the tweet (optional)
  withheld?: {
    copyright: boolean;
    countryCodes: string[];
    scope: 'tweet' | 'user';
  };

  // Various public metrics about the tweet (optional)
  publicMetrics?: {
    retweetCount: number;
    replyCount: number;
    likeCount: number;
    quoteCount: number;
    impressionCount: number;
    bookmarkCount: number;
  };

  // Various non-public metrics about the tweet (optional)
  nonPublicMetrics?: {
    impressionCount: number;
    urlLinkClicks: number;
    userProfileClicks: number;
  };

  // Various organic metrics about the tweet (optional)
  organicMetrics?: {
    impressionCount: number;
    urlLinkClicks: number;
    userProfileClicks: number;
    retweetCount: number;
    replyCount: number;
    likeCount: number;
  };

  // Various promoted metrics about the tweet (optional)
  promotedMetrics?: {
    impressionCount: number;
    urlLinkClicks: number;
    userProfileClicks: number;
    retweetCount: number;
    replyCount: number;
    likeCount: number;
  };

  // A flag indicating whether the tweet may contain sensitive content (optional)
  possiblySensitive?: boolean;

  // The language of the tweet (optional)
  lang?: string;

  // The reply settings for the tweet (optional)
  replySettings?: 'everyone' | 'mentionedUsers' | 'following';
}