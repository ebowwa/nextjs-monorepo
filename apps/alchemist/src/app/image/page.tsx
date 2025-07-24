"use client";
import React, { useState, useCallback } from 'react';
import { useVisionLogic } from '@/hooks/gemini/useVisionLogic';

const ImageProcessingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const {
    result,
    prompt,
    setPrompt,
    loading,
    isFormSubmittable,
    handleRefresh,
    handleSubmitForm,
  } = useVisionLogic();

  // Handles the change of the file input for image uploads
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const imageFiles = Array.from(files).map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...imageFiles]);
  }, []);

  // Updates the prompt state on user input
  const handlePromptChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  }, [setPrompt]);

  const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted with prompt:', prompt); // Debug log
    if (prompt && isFormSubmittable()) {
      handleSubmitForm(prompt);
    }
  }, [prompt, isFormSubmittable, handleSubmitForm]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Upload Images for Processing</h1>
      <input type="file" multiple onChange={handleImageUpload} accept="image/*" />

      {/* Form for submitting image processing prompts */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter a prompt for the image"
          className="mt-4 px-4 py-2 border rounded"
          disabled={loading} // Disable input while loading
        />
        <button
          type="submit"
          className="mt-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!isFormSubmittable() || loading}>
          Submit Prompt
        </button>
        <button
          type="button"
          className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleRefresh}
          disabled={loading || !prompt}>
          Refresh Results
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {result && <div className="mt-4"><p>Result: {result}</p></div>}
    </div>
  );
};

export default ImageProcessingPage;
