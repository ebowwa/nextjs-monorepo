// src/components/bucketImage.tsx
// public bucket fetch
import React, { useEffect, useState } from 'react';
import { getPublicUrl } from '@/utils/supabase/storage';

interface BucketImageProps {
  bucketId: string;
  path: string;
  options?: {
    download?: string | boolean;
  };
  alt?: string;
  className?: string;
}

const BucketImage: React.FC<BucketImageProps> = ({
  bucketId,
  path,
  options,
  alt,
  className,
}) => {
  const [publicUrl, setPublicUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getPublicUrl(bucketId, path, options);
        setPublicUrl(url);
      } catch (error) {
        console.error('Failed to retrieve public URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [bucketId, path, options]);

  if (loading) {
    return <p>Loading image...</p>;
  }

  return (
    <div>
      {publicUrl && (
        <div>
          <img src={publicUrl} alt={alt} className={className} />
        </div>
      )}
    </div>
  );
};

export default BucketImage;