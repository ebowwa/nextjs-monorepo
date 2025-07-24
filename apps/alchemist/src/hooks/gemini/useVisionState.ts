// hooks/useVisionState.ts
import { useState, useCallback } from "react";
import { MediaData, GeneralSettings, SafetySettings, UseVisionStateParams } from "@/types/index";

export const useVisionState = ({ generalSettings, safetySettings, mediaDataList }: UseVisionStateParams) => {
  const [result, setResult] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isFormSubmittable = useCallback(() => {
    return (
      prompt.trim() !== "" &&
      mediaDataList.some(
        (media) => media !== null && media.data !== "" && media.mimeType !== ""
      )
    );
  }, [prompt, mediaDataList]);

  return { result, setResult, prompt, setPrompt, userQuestion, setUserQuestion, loading, setLoading, isFormSubmittable };
};
