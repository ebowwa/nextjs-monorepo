// src/components/Bookmarks/bookmark.tsx

import React from 'react';

/**
 * Defines the structure of a single bookmark returned by the Twitter API.
 */
interface Bookmark {
  // The unique identifier of the bookmark
  id: string;

  // The text content of the tweet
  text: string;

  // The timestamp when the tweet was created
  createdAt: string;

  // The source of the tweet
  tweetSource: string;

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
      urls: {
        start: number;
        end: number;
        url: string;
        expandedUrl: string;
        displayUrl: string;
        unwoundUrl: string;
      }[];
      mentions: {
        start: number;
        end: number;
        username: string;
      }[];
      hashtags: {
        start: number;
        end: number;
        tag: string;
      }[];
      cashtags: {
        start: number;
        end: number;
        tag: string;
      }[];
    };
    source?: string;
  };

  // Information about tweets that are referenced by the bookmark (optional)
  referencedTweets?: {
    type: string;
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
      coordinates: number[];
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
    scope: string;
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
  replySettings?: string;

  // The source of the bookmark (optional)
  source?: string;
}

/**
 * Defines the props for the BookmarkComponent.
 */
interface BookmarkProps {
  bookmarks: Bookmark[];
}

/**
 * A React component that renders a list of bookmarks.
 *
 * @param props - The BookmarkProps object containing the bookmarks to be rendered.
 * @returns A React element representing the BookmarkComponent.
 */
const BookmarkComponent: React.FC<BookmarkProps> = ({ bookmarks }) => {
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id}>
          <h3>{bookmark.text}</h3>
          <p>Created at: {bookmark.createdAt}</p>
          <p>Source: {bookmark.tweetSource}</p>
          <p>Edit History: {bookmark.editHistory.join(', ')}</p>
          <p>Edit Controls:</p>
          <ul>
            <li>Is Edit Eligible: {bookmark.editControls.isEditEligible.toString()}</li>
            <li>Editable Until: {bookmark.editControls.editableUntil}</li>
            <li>Edits Remaining: {bookmark.editControls.editsRemaining}</li>
          </ul>
          <p>Conversation ID: {bookmark.conversationId}</p>
          {bookmark.noteTweet && (
            <div>
              <h4>Note Tweet</h4>
              <p>Text: {bookmark.noteTweet.text}</p>
              <p>Entities:</p>
              <ul>
                <li>URLs: {bookmark.noteTweet.entities.urls.map((url, index) => (
                  <div key={index}>
                    <p>Start: {url.start}</p>
                    <p>End: {url.end}</p>
                    <p>URL: {url.url}</p>
                    <p>Expanded URL: {url.expandedUrl}</p>
                    <p>Display URL: {url.displayUrl}</p>
                    <p>Unwound URL: {url.unwoundUrl}</p>
                  </div>
                ))}</li>
                <li>Mentions: {bookmark.noteTweet.entities.mentions.map((mention, index) => (
                  <div key={index}>
                    <p>Start: {mention.start}</p>
                    <p>End: {mention.end}</p>
                    <p>Username: {mention.username}</p>
                  </div>
                ))}</li>
                <li>Hashtags: {bookmark.noteTweet.entities.hashtags.map((hashtag, index) => (
                  <div key={index}>
                    <p>Start: {hashtag.start}</p>
                    <p>End: {hashtag.end}</p>
                    <p>Tag: {hashtag.tag}</p>
                  </div>
                ))}</li>
                <li>Cashtags: {bookmark.noteTweet.entities.cashtags.map((cashtag, index) => (
                  <div key={index}>
                    <p>Start: {cashtag.start}</p>
                    <p>End: {cashtag.end}</p>
                    <p>Tag: {cashtag.tag}</p>
                  </div>
                ))}</li>
              </ul>
              {bookmark.noteTweet.source && <p>Source: {bookmark.noteTweet.source}</p>}
            </div>
          )}
          {bookmark.referencedTweets && (
            <div>
              <h4>Referenced Tweets</h4>
              {bookmark.referencedTweets.map((referencedTweet, index) => (
                <div key={index}>
                  <p>Type: {referencedTweet.type}</p>
                  <p>ID: {referencedTweet.id}</p>
                </div>
              ))}
            </div>
          )}
          {bookmark.attachments && (
            <div>
              <h4>Attachments</h4>
              <p>Media Keys: {bookmark.attachments.mediaKeys.join(', ')}</p>
              <p>Poll IDs: {bookmark.attachments.pollIds.join(', ')}</p>
            </div>
          )}
          {bookmark.geo && (
            <div>
              <h4>Geo</h4>
              <p>Coordinates: {bookmark.geo.coordinates.coordinates.join(', ')}</p>
              <p>Place ID: {bookmark.geo.placeId}</p>
            </div>
          )}
          {bookmark.contextAnnotations && (
            <div>
              <h4>Context Annotations</h4>
              {bookmark.contextAnnotations.map((annotation, index) => (
                <div key={index}>
                  <p>Domain ID: {annotation.domain.id}</p>
                  <p>Domain Name: {annotation.domain.name}</p>
                  <p>Domain Description: {annotation.domain.description}</p>
                  <p>Entity ID: {annotation.entity.id}</p>
                  <p>Entity Name: {annotation.entity.name}</p>
                  <p>Entity Description: {annotation.entity.description}</p>
                </div>
              ))}
            </div>
          )}
          {bookmark.entities && (
            <div>
              <h4>Entities</h4>
              <p>Annotations:</p>
              <ul>
                {bookmark.entities.annotations.map((annotation, index) => (
                  <li key={index}>
                    <p>Start: {annotation.start}</p>
                    <p>End: {annotation.end}</p>
                    <p>Probability: {annotation.probability}</p>
                    <p>Type: {annotation.type}</p>
                    <p>Normalized Text: {annotation.normalizedText}</p>
                  </li>
                ))}
              </ul>
              <p>URLs:</p>
              <ul>
                {bookmark.entities.urls.map((url, index) => (
                  <li key={index}>
                    <p>Start: {url.start}</p>
                    <p>End: {url.end}</p>
                    <p>URL: {url.url}</p>
                    <p>Expanded URL: {url.expandedUrl}</p>
                    <p>Display URL: {url.displayUrl}</p>
                    <p>Unwound URL: {url.unwoundUrl}</p>
                  </li>
                ))}
              </ul>
              <p>Hashtags:</p>
              <ul>
                {bookmark.entities.hashtags.map((hashtag, index) => (
                  <li key={index}>
                    <p>Start: {hashtag.start}</p>
                    <p>End: {hashtag.end}</p>
                    <p>Tag: {hashtag.tag}</p>
                  </li>
                ))}
              </ul>
              <p>Mentions:</p>
              <ul>
                {bookmark.entities.mentions.map((mention, index) => (
                  <li key={index}>
                    <p>Start: {mention.start}</p>
                    <p>End: {mention.end}</p>
                    <p>Username: {mention.username}</p>
                  </li>
                ))}
              </ul>
              <p>Cashtags:</p>
              <ul>
                {bookmark.entities.cashtags.map((cashtag, index) => (
                  <li key={index}>
                    <p>Start: {cashtag.start}</p>
                    <p>End: {cashtag.end}</p>
                    <p>Tag: {cashtag.tag}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {bookmark.withheld && (
            <div>
              <h4>Withheld</h4>
              <p>Copyright: {bookmark.withheld.copyright.toString()}</p>
              <p>Country Codes: {bookmark.withheld.countryCodes.join(', ')}</p>
              <p>Scope: {bookmark.withheld.scope}</p>
            </div>
          )}
          {bookmark.publicMetrics && (
            <div>
              <h4>Public Metrics</h4>
              <p>Retweet Count: {bookmark.publicMetrics.retweetCount}</p>
              <p>Reply Count: {bookmark.publicMetrics.replyCount}</p>
              <p>Like Count: {bookmark.publicMetrics.likeCount}</p>
              <p>Quote Count: {bookmark.publicMetrics.quoteCount}</p>
              <p>Impression Count: {bookmark.publicMetrics.impressionCount}</p>
              <p>Bookmark Count: {bookmark.publicMetrics.bookmarkCount}</p>
            </div>
          )}
          {bookmark.nonPublicMetrics && (
            <div>
              <h4>Non-Public Metrics</h4>
              <p>Impression Count: {bookmark.nonPublicMetrics.impressionCount}</p>
              <p>URL Link Clicks: {bookmark.nonPublicMetrics.urlLinkClicks}</p>
              <p>User Profile Clicks: {bookmark.nonPublicMetrics.userProfileClicks}</p>
            </div>
          )}
          {bookmark.organicMetrics && (
            <div>
              <h4>Organic Metrics</h4>
              <p>Impression Count: {bookmark.organicMetrics.impressionCount}</p>
              <p>URL Link Clicks: {bookmark.organicMetrics.urlLinkClicks}</p>
              <p>User Profile Clicks: {bookmark.organicMetrics.userProfileClicks}</p>
              <p>Retweet Count: {bookmark.organicMetrics.retweetCount}</p>
              <p>Reply Count: {bookmark.organicMetrics.replyCount}</p>
              <p>Like Count: {bookmark.organicMetrics.likeCount}</p>
            </div>
          )}
          {bookmark.promotedMetrics && (
            <div>
              <h4>Promoted Metrics</h4>
              <p>Impression Count: {bookmark.promotedMetrics.impressionCount}</p>
              <p>URL Link Clicks: {bookmark.promotedMetrics.urlLinkClicks}</p>
              <p>User Profile Clicks: {bookmark.promotedMetrics.userProfileClicks}</p>
              <p>Retweet Count: {bookmark.promotedMetrics.retweetCount}</p>
              <p>Reply Count: {bookmark.promotedMetrics.replyCount}</p>
              <p>Like Count: {bookmark.promotedMetrics.likeCount}</p>
            </div>
          )}
          {bookmark.possiblySensitive !== undefined && (
            <p>Possibly Sensitive: {bookmark.possiblySensitive.toString()}</p>
          )}
          {bookmark.lang && <p>Language: {bookmark.lang}</p>}
          {bookmark.replySettings && <p>Reply Settings: {bookmark.replySettings}</p>}
          {bookmark.source && <p>Source: {bookmark.source}</p>}
        </div>
      ))}
    </div>
  );
};

export default BookmarkComponent;