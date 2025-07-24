// src/hooks/useControlHandlers.ts
import { useControlContext } from "@/providers/ControlContext";
import { MAX_IMAGES } from "@/constants";

export const useControlHandlers = () => {
  const {
    handleModelChange,
    handleGeneralSettingsChange,
    handleSafetyChange,
    handleMediaUpload,
    removeMediaData,
    ...context
  } = useControlContext();

  const handleImageUpload = (data: string, mimeType: string, index: number) => {
    if (index < MAX_IMAGES) {
      handleMediaUpload(data, mimeType, index);
    } else {
      console.error("Maximum number of images reached");
    }
  };

  const handleRemoveImage = (index: number) => removeMediaData(index);

  return { ...context, handleModelChange, handleGeneralSettingsChange, handleSafetyChange, handleImageUpload, handleRemoveImage };
};
