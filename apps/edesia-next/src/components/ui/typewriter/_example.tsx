"use client";

import React from 'react';
import DynamicTextComponent from './dynamic'; // Adjust the import path as necessary

const Page = () => {
  const categories = ['Food Trucks', 'Caterers', 'Street Food Vendors', 'Pop-Up Markets']; // Define relevant categories

  return (
    <main>
      {/* ... other components and sections ... */}
      <DynamicTextComponent categories={categories} />
      {/* ... more content ... */}
    </main>
  );
};

export default Page;
