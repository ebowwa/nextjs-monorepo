import crypto from 'crypto';

/**
 * Generates a unique nonce for the OAuth request.
 * @returns A unique nonce string.
 */
export function generateNonce(): string {
  // Generate a random string of 32 characters
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Generates the OAuth signature for the request.
 * @param consumerSecret The consumer secret of the Twitter application.
 * @param callbackUrl The callback URL for the OAuth flow.
 * @param nonce The unique nonce for the request.
 * @param timestamp The timestamp of the request.
 * @param consumerKey The consumer key of the Twitter application.
 * @param signatureMethod The signature method to use (e.g., 'HMAC-SHA1').
 * @returns The generated OAuth signature.
 */
export function generateSignature(
  consumerSecret: string,
  callbackUrl: string,
  nonce: string,
  timestamp: string,
  consumerKey: string,
  signatureMethod: string
): string {
  // Construct the base string for the signature
  const baseString = [
    'POST',
    encodeURIComponent('https://api.twitter.com/oauth/request_token'),
    encodeURIComponent(
      `oauth_callback=${encodeURIComponent(callbackUrl)}&` +
        `oauth_consumer_key=${consumerKey}&` +
        `oauth_nonce=${nonce}&` +
        `oauth_signature_method=${signatureMethod}&` +
        `oauth_timestamp=${timestamp}&` +
        `oauth_version=1.0`
    ),
  ].join('&');

  // Generate the HMAC-SHA1 signature
  const signingKey = `${encodeURIComponent(consumerSecret)}&`;
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  return signature;
}