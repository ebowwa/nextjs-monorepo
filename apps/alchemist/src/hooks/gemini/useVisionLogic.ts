// hooks/useVisionLogic.ts
"use client";
import { useState, useCallback } from "react";
import { useControlContext } from "@/providers/ControlContext";
import { useVisionState } from "@/hooks/gemini/useVisionState";
import { useApiCall } from "@/hooks/gemini/useApiCall";

export const useVisionLogic = () => {
  const { generalSettings, safetySettings, mediaDataList } = useControlContext();
  const { result, setResult, prompt, setPrompt, userQuestion, setUserQuestion, loading, setLoading, isFormSubmittable } = useVisionState({ generalSettings, safetySettings, mediaDataList });
  const makeApiCall = useApiCall({ mediaDataList, generalSettings, safetySettings, setResult, setLoading });

  const handleRefresh = useCallback(() => {
    if (!userQuestion) return;
    setLoading(true);
    setResult("");
    makeApiCall(userQuestion);
  }, [userQuestion, makeApiCall, setLoading, setResult]);

  const handleSubmitForm = useCallback(async (prompt: string) => {
    if (!isFormSubmittable()) return;
    setLoading(true);
    setUserQuestion(prompt);
    setResult("");
    setPrompt("");
    await makeApiCall(prompt);
  }, [isFormSubmittable, makeApiCall, setLoading, setUserQuestion, setResult, setPrompt]);

  return {
    result,
    prompt,
    userQuestion,
    loading,
    isFormSubmittable,
    handleRefresh,
    handleSubmitForm,
    setPrompt,
    mediaDataList, // Return mediaDataList here
  };
};