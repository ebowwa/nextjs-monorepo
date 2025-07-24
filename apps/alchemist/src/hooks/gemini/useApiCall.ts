// src/hooks/useApiCall.ts
import { useCallback } from "react";
import { MediaData, GeneralSettings, SafetySettings, UseApiCallParams } from "@/types";
import { filterValidMediaData, prepareRequestBody } from "@/utils/mediaDataUtils";
import { handleApiResponse } from "@/utils/apiResponseHandler";

export const useApiCall = ({ mediaDataList, generalSettings, safetySettings, setResult, setLoading }: UseApiCallParams) => {
  const makeApiCall = useCallback(
    async (message: string) => {
      const validMediaData = filterValidMediaData(mediaDataList);
      if (validMediaData.length === 0 || message.trim() === "") return;

      const body = prepareRequestBody(message, validMediaData, generalSettings, safetySettings);

      try {
        setLoading(true);
        const response = await fetch(`/api/gemini-vision`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });

        await handleApiResponse(response, setResult);
      } catch (error) {
        if (error instanceof Error) {
          setResult(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    },
    [mediaDataList, generalSettings, safetySettings, setResult, setLoading]
  );

  return makeApiCall;
};
