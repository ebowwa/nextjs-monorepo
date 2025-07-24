// src/hooks/useNavigateWithImages.ts
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { blobUrlToBase64, dbPromise } from '../utils/imageDBUtils';

export const useNavigateWithImages = (images: { pngUrl?: string }[]) => {
  const router = useRouter();

  const navigateAndSendImages = useCallback(async () => {
    const base64Images = await Promise.all(
      images.filter(image => image.pngUrl).map(image => blobUrlToBase64(image.pngUrl!))
    );

    const db = await dbPromise;
    for (const base64Image of base64Images) {
      await db.add('images', { image: base64Image });
    }

    router.push('/result');
  }, [images, router]);

  return navigateAndSendImages;
};