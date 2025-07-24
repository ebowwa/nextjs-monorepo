// components/NoMediaMessage.tsx
import React from 'react';
import { NoMediaMessageProps } from '@/types/index';

export const NoMediaMessage: React.FC<NoMediaMessageProps> = ({ mediaDataList }) => (
  mediaDataList.every((media) => media === null || media?.data === "") ? (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-2xl text-primary/80 font-medium">Add an image to get started</div>
    </div>
  ) : null
);
