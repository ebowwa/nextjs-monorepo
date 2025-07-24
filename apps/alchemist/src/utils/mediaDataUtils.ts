// src/utils/mediaDataUtils.ts
import { MediaData, GeneralSettings, SafetySettings } from "@/types/index";

export const filterValidMediaData = (mediaDataList: MediaData[]) =>
  mediaDataList.filter((data) => data.data !== "" && data.mimeType !== "");

export const prepareRequestBody = (
  message: string,
  validMediaData: MediaData[],
  generalSettings: GeneralSettings,
  safetySettings: SafetySettings
) => {
  const mediaBase64 = validMediaData.map((data) => data.data.replace(/^data:(image|video)\/\w+;base64,/, ""));
  const mediaTypes = validMediaData.map((data) => data.mimeType);

  return JSON.stringify({
    message,
    media: mediaBase64,
    media_types: mediaTypes,
    general_settings: generalSettings,
    safety_settings: safetySettings,
  });
};
