// hooks/useCustomDropzone.ts
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { resizeImage } from "@/utils/resizeImage";
import { readFileAsBase64 } from "@/utils/readFileAsBase64";
import { MAX_IMAGE_SIZE } from "@/constants";

export const useCustomDropzone = (onFileUpload: (data: string, mimeType: string) => void, setError: (error: string | null) => void) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      setError("File type not supported. Please try .jpg or .png file");
      return;
    }
    setError(null);

    if (file.type.startsWith("image/")) {
      if (file.size > MAX_IMAGE_SIZE) {
        const resizedDataURL = await resizeImage(file, MAX_IMAGE_SIZE);
        onFileUpload(resizedDataURL, file.type);
      } else {
        readFileAsBase64(file).then((base64String) => onFileUpload(base64String, file.type));
      }
    } else if (file.type.startsWith("video/")) {
      readFileAsBase64(file).then((base64String) => onFileUpload(base64String, file.type));
    }
  }, [onFileUpload, setError]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      // "video/mp4": [],
      // "video/webm": [],
      // "video/ogg": [],
    },
  });

  return { getRootProps, getInputProps, open, isDragActive };
};
