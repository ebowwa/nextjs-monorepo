// app/disclaimer/page.tsx
'use client';

import React from 'react';
import { SanrioDisclaimerCard } from '@/components/SanrioDisclaimerCard';
// Ensure the import path for SanrioDisclaimerCard is correctly set based on where you place the component.

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SanrioDisclaimerCard />
    </div>
  );
}
