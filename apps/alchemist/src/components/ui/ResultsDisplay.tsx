// components/ResultDisplay.tsx
import React from 'react';
import { MarkdownViewer } from '../markdown-viewer/MarkdownViewer';
import { TypingBubble } from '../gemini/TypingBubble';
import { ResultDisplayProps } from '@/types/index';

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, loading }) => (
  <div className="flex-1 overflow-y-auto p-4">
    <MarkdownViewer text={result} />
    {loading && <TypingBubble />}
  </div>
);
