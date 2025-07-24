// src/components/gemini/vision/ImageUploader.tsx
import React, { useCallback } from 'react';
import Image from 'next/image';
import { base64ToBlob } from '@/utils/base64ToBlob';
import { readFileAsBase64 } from '@/utils/readFileAsBase64';
import { resizeImage } from '@/utils/resizeImage';
import { useControlContext } from '@/providers/ControlContext';
import { MAX_IMAGE_SIZE } from '@/constants';

interface ImageUploaderProps {
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImages,
  setUploadedImages,
}) => {
  const { handleMediaUpload } = useControlContext();

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const fileArray = Array.from(files);
        let totalPayloadSize = 0; // Keep track of the total payload size
        const validFiles: File[] = [];
        const maxPayloadSize = 5 * 1024 * 1024; // 5MB limit for the entire payload

        for (const file of fileArray) {
          // Directly pass the file to resizeImage, no need to convert to base64 first
          const resizedBase64 = await resizeImage(file, MAX_IMAGE_SIZE);
          const blob = base64ToBlob(resizedBase64, file.type);
          const newFile = new File([blob], file.name, { type: file.type });

          // Calculate the size of the base64 representation
          const estimatedBase64Size = (blob.size * 4) / 3; // Base64 encoding increases size by about 33%

          if (totalPayloadSize + estimatedBase64Size > maxPayloadSize) {
            alert(
              'Cannot upload more images. Total payload size would exceed the 5MB limit.'
            );
            break; // Stop adding more images as it would exceed the total allowed payload size
          }

          totalPayloadSize += estimatedBase64Size;
          validFiles.push(newFile);
        }

        if (validFiles.length > 0) {
          validFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Data = reader.result?.toString().split(',')?.[1] || '';
              handleMediaUpload(base64Data, file.type, index);
            };
          });

          setUploadedImages((prevImages) => [...prevImages, ...validFiles]);
        }
      }
    },
    [handleMediaUpload]
  );

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleImageUpload} />
      <div>
        {uploadedImages.map((image: File, index: number) => (
          <div key={index}>
            <Image
              src={URL.createObjectURL(image)}
              alt={`Uploaded Image ${index}`}
              width={MAX_IMAGE_SIZE}
              height={MAX_IMAGE_SIZE}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;