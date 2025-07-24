// types/media.ts
export interface ImageFileWithStatus {
    file: File;
    pngUrl?: string;
    status: 'pending' | 'converted' | 'verifying' | 'error';
    errorMessage?: string;
    format: 'jpeg' | 'png' | 'jpg' | 'webp' | 'heic';
  }
  
  export type MediaData = {
    data: string;
    mimeType: string;
  };
  
  export interface ImageRowProps {
    data: Array<{
      id: number;
      productDetails: string;
      reviewInfo: string;
      dateInfo: string;
    }>;
  }
  
  export interface ImageTableProps {
    data: Array<{
      id: number;
      productDetails: string;
      reviewInfo: string;
      dateInfo: string;
    }>;
  }