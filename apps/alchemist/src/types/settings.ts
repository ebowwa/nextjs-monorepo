import { MediaData } from ".";
// types/settings.ts
export type GeneralSettings = {
    temperature: number;
    maxLength: number;
    topP: number;
    topK: number;
  };
  
  export type SafetySettings = {
    harassment: number;
    hateSpeech: number;
    sexuallyExplicit: number;
    dangerousContent: number;
  };
  
  export type UseVisionStateParams = {
    generalSettings: GeneralSettings;
    safetySettings: SafetySettings;
    mediaDataList: MediaData[];
  };
  
  export type UseApiCallParams = {
    mediaDataList: MediaData[];
    generalSettings: GeneralSettings;
    safetySettings: SafetySettings;
    setResult: (result: string) => void;
    setLoading: (loading: boolean) => void;
  };