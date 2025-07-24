// src/components/gemini/vision/VisionResult.tsx
import React from 'react';

interface VisionResultProps {
  userQuestion: string;
  result: string;
  loading: boolean;
}

const VisionResult: React.FC<VisionResultProps> = ({ userQuestion, result, loading }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      <div>
        <h2>User Question:</h2>
        <p>{userQuestion}</p>
        <h2>Result:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
};

export default VisionResult;