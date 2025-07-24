// src/utils/twitterBearer.ts
import { TwitterApi } from 'twitter-api-v2';
import { config } from 'dotenv';

config();

const twitterBearer = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_BEARER_TOKEN!,
});

export { twitterBearer };