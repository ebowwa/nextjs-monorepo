// ImageLoaderComponent.tsx
// supabase storage bucket
"use client";
import { usePublicUrl } from '@/hooks/supabase/useFetchPublicUrlHook';
import React from 'react';


const ImageLoaderComponent = () => {
  const { publicUrl, loading } = usePublicUrl('static', 'ui/merchondemandlogo.png');

  if (loading) {
    return <p>Loading public URL...</p>;
  }

  return (
    <div>
      {publicUrl && (
        <div>
          <img src={publicUrl} alt="Avatar" />
        </div>
      )}
    </div>
  );
};

export default ImageLoaderComponent;
