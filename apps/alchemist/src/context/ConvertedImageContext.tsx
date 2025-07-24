// src/context/ConvertedImageContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

interface ImageContextType {
  showTable: boolean;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConvertedImageContext = createContext<ImageContextType | undefined>(undefined);

export const useConvertedImageContext = () => {
  const context = useContext(ConvertedImageContext);
  if (!context) {
    throw new Error('useConvertedImageContext must be used within a ConvertedImageProvider');
  }
  return context;
};

export const ConvertedImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <ConvertedImageContext.Provider value={{ showTable, setShowTable }}>
      {children}
    </ConvertedImageContext.Provider>
  );
};