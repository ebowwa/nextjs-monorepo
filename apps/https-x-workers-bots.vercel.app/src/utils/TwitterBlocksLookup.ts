// src/utils/TwitterBlocksLookup.ts
import crypto from 'crypto';
import OAuth, { Token } from 'oauth-1.0a';
import qs from 'querystring';

export type BlockedUser = {
  ids: string;
  name: string;
  username: string;
};

// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = process.env.CONSUMER_KEY;
console.log('Consumer key:', consumer_key);
const consumer_secret = process.env.CONSUMER_SECRET;
console.log('Consumer secret:', consumer_secret);

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
const oauth = new OAuth({
    consumer: {
      key: consumer_key!,
      secret: consumer_secret!
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
  });

export async function requestToken(): Promise<{ oauth_token: string; oauth_token_secret: string }> {
  console.log('Requesting OAuth request token...');
  const authHeader = oauth.toHeader(oauth.authorize({ url: requestTokenURL, method: 'POST' }));

  const response = await fetch(requestTokenURL, {
    method: 'POST',
    headers: {
      'Authorization': authHeader['Authorization']
    }
  });

  if (response.ok) {
    const data = await response.text();
    console.log('Received OAuth request token:', data);
    return qs.parse(data) as { oauth_token: string; oauth_token_secret: string };
  } else {
    console.error('Error getting OAuth request token:', response.status, response.statusText);
    throw new Error('Cannot get an OAuth request token');
  }
}

export async function accessToken(
  { oauth_token, oauth_token_secret }: { oauth_token: string; oauth_token_secret: string },
  verifier: string
): Promise<{ oauth_token: string; oauth_token_secret: string }> {
  console.log('Requesting OAuth access token...');
  const authHeader = oauth.toHeader(oauth.authorize({ url: accessTokenURL, method: 'POST' }));
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`;

  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Authorization': authHeader['Authorization']
    }
  });

  if (response.ok) {
    const data = await response.text();
    console.log('Received OAuth access token:', data);
    return qs.parse(data) as { oauth_token: string; oauth_token_secret: string };
  } else {
    console.error('Error getting OAuth access token:', response.status, response.statusText);
    throw new Error('Cannot get an OAuth request token');
  }
}

export async function getRequest({ oauth_token, oauth_token_secret, userId }: { oauth_token: string; oauth_token_secret: string; userId: string }): Promise<any> {
  console.log('Making API request...');
  const token: Token = {
    key: oauth_token,
    secret: oauth_token_secret
  };

  const endpointURL = `https://api.twitter.com/2/users/${userId}/blocking`;
  const authHeader = oauth.toHeader(oauth.authorize({ url: endpointURL, method: 'GET' }, token));

  const response = await fetch(endpointURL, {
    headers: {
      'Authorization': authHeader['Authorization'],
      'user-agent': 'v2BlocksLookupJS'
    }
  });

  if (response.ok) {
    console.log('API request successful:', await response.json());
    return await response.json();
  } else {
    console.error('Error making API request:', response.status, response.statusText);
    throw new Error('Unsuccessful request');
  }
}