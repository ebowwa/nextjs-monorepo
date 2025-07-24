// components/VisionContainer.tsx
import React from "react";
import { useVisionLogic } from "@/hooks/gemini/useVisionLogic";
import { Card } from "@/components/ui/common/card";
import { CommonForm } from "./CommonForm";
import { UserQuestionDisplay } from "@/components/ui/UserQuestionDisplay";
import { ResultDisplay } from "@/components/ui/ResultsDisplay";
import { NoMediaMessage } from "@/components/ui/NoMediaMessage";

export const VisionContainer = () => {
  const {
    result,
    prompt,
    userQuestion,
    loading,
    isFormSubmittable,
    handleRefresh,
    handleSubmitForm,
    setPrompt,
    mediaDataList, // Retrieve mediaDataList from the hook
  } = useVisionLogic();

  return (
    <div className="flex flex-col h-[95vh]">
      <Card className="flex flex-col flex-1 overflow-hidden">
        <UserQuestionDisplay userQuestion={userQuestion} loading={loading} onRefresh={handleRefresh} />
        <ResultDisplay result={result} loading={loading} />
        <NoMediaMessage mediaDataList={mediaDataList} />
        <CommonForm
          value={prompt}
          placeholder="Ask a question about the images"
          loading={loading}
          onInputChange={(e) => setPrompt(e.target.value)}
          onFormSubmit={(e) => {
            e.preventDefault();
            handleSubmitForm(prompt);
          }}
          isSubmittable={isFormSubmittable()}
        />
      </Card>
    </div>
  );
};
