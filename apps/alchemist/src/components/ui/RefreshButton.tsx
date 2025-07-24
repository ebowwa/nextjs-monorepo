// @/components/RefreshButton.tsx
import React from 'react';
import { Button } from '@/components/ui/common/button';
import { RefreshCcw } from 'lucide-react';
import { RefreshButtonProps } from '@/types/index';

export const RefreshButton: React.FC<RefreshButtonProps> = ({ loading, onRefresh }) => (
  <Button type="button" variant="ghost" onClick={onRefresh} disabled={loading}>
    <RefreshCcw className="w-4 h-4" />
  </Button>
);