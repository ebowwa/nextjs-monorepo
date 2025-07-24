// src/components/gemini/vision/VisionForm.tsx
import React, { useCallback } from 'react';

interface VisionFormProps {
  prompt: string;
  isFormSubmittable: () => boolean;
  loading: boolean;
  handleSubmitForm: (prompt: string) => void;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const VisionForm: React.FC<VisionFormProps> = ({
  prompt,
  isFormSubmittable,
  loading,
  handleSubmitForm,
  setPrompt,
}) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmitForm(prompt);
    },
    [prompt, handleSubmitForm]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
    },
    [setPrompt]
  );

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={handleInputChange}
        placeholder="Ask a question about the images"
      />
      <button type="submit" disabled={!isFormSubmittable() || loading}>
        Submit
      </button>
    </form>
  );
};

export default VisionForm;