"use client"; // src/components/VisionPage.tsx

import React, { useState } from 'react';
import { useControlContext } from '@/providers/ControlContext';
import { useVisionLogic } from '@/hooks/gemini/useVisionLogic';
import ImageUploader from '@/components/gemini/vision/ImageUploader';
import VisionForm from '@/components/gemini/vision/VisionForm';
import VisionResult from '@/components/gemini/vision/VisionResult';

const VisionPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { handleMediaUpload } = useControlContext();

  const {
    result,
    prompt,
    userQuestion,
    loading,
    isFormSubmittable,
    handleRefresh,
    handleSubmitForm,
    setPrompt,
  } = useVisionLogic();

  return (
    <div>
      <h1>Vision Model</h1>
      <ImageUploader
        uploadedImages={uploadedImages}
        setUploadedImages={setUploadedImages}
      />
      <VisionForm
        prompt={prompt}
        isFormSubmittable={isFormSubmittable}
        loading={loading}
        handleSubmitForm={handleSubmitForm}
        setPrompt={setPrompt}
      />
      <VisionResult userQuestion={userQuestion} result={result} loading={loading} />
    </div>
  );
};

export default VisionPage;