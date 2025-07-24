import { twitterClient } from './twitterClient';
import { download } from '../utils/utilities';

export async function tweet(text: string, imageUri: string): Promise<void> {
  try {
    // Download the image to the local file system
    await download(imageUri, 'image.png', () => {
      console.log('Image downloaded');
    });

    // Upload the image to Twitter
    const mediaId = await twitterClient.v1.uploadMedia('image.png');
    console.log('Media ID:', mediaId);

    // Tweet the image
    await twitterClient.v2.tweet({
      text: text,
      media: {
        media_ids: [mediaId],
      },
    });

    console.log('Image tweeted!');
  } catch (err) {
    console.error(err);
  }
}