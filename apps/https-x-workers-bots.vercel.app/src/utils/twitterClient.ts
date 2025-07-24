// src/utils/twitterClient.ts
import { TwitterApi } from 'twitter-api-v2';
import { config } from 'dotenv';

config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

async function checkTwitterCredentials() {
  try {
    const response = await twitterClient.v2.me();
    console.log('Twitter credentials are valid:', response.data);
  } catch (error) {
    console.error('Error checking Twitter credentials:', error);
    throw error;
  }
}

checkTwitterCredentials()
  .then(() => {
    console.log('Twitter credentials are valid');
  })
  .catch((error) => {
    console.error('Error checking Twitter credentials:', error);
    process.exit(1);
  });

export { twitterClient };