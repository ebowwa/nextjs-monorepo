// src/components/upload-image/NavigateWithConvertedImages.tsx
import React from 'react';
import { useConvertedImageContext } from '@/context/ConvertedImageContext';
import { storeImagesInIDB } from '@/utils/idbOperations';

interface Props {
  images: { pngUrl?: string }[];
}

const NavigateWithConvertedImages: React.FC<Props> = ({ images }) => {
  const { setShowTable } = useConvertedImageContext();

  const handleShowTable = async () => {
    // Store the converted images in the IndexedDB
    const convertedImages = images.map((image) => image.pngUrl || '');
    await storeImagesInIDB(convertedImages);

    // Set the showTable state to true
    setShowTable(true);
  };

  return (
    <button onClick={handleShowTable} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      View Converted Images
    </button>
  );
};

export default NavigateWithConvertedImages;