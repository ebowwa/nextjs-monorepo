// components/UserQuestionDisplay.tsx
import React from 'react';
import { RefreshButton } from '@/components/ui/RefreshButton';
import { UserQuestionDisplayProps } from '@/types/index';

export const UserQuestionDisplay: React.FC<UserQuestionDisplayProps> = ({ userQuestion, loading, onRefresh }) => (
  userQuestion ? (
    <div className="bg-primary/20 p-4 flex space-x-4">
      <RefreshButton loading={loading} onRefresh={onRefresh} />
      <div>{userQuestion}</div>
    </div>
  ) : null
);
