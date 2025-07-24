// src/components/gemini/vision/UploadedImagesList.tsx
import React from 'react';
import Image from 'next/image';

interface UploadedImagesListProps {
  uploadedImages: File[];
}

const UploadedImagesList: React.FC<UploadedImagesListProps> = ({ uploadedImages }) => {
  return (
    <div>
      {uploadedImages.map((image: File, index: number) => (
        <div key={index}>
          <Image src={URL.createObjectURL(image)} alt={`Uploaded Image ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default UploadedImagesList;