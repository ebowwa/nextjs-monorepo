// src/components/Home/FeatureSection.tsx
import React from 'react';
import { ButtonNextLink } from '@/components/ui/ButtonNextLink';
import ResponsiveImage from '@/components/ui/ResponsiveImage'; // Import the new component

interface FeatureSectionProps {
  title: React.ReactNode;
  description: string;
  imageUrl?: string;
  reverse?: boolean;
  bookNowUrl: string;
  browseVendorsUrl: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  imageUrl,
  reverse = false,
  bookNowUrl,
  browseVendorsUrl,
}) => {
  return (
    <section className={`${reverse ? 'lg:flex-row-reverse' : ''} flex`}>
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 xl:px-8">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-6xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
              {title}
            </h2>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex space-x-4 mt-4">
            <ButtonNextLink href={bookNowUrl}>Book Now</ButtonNextLink>
            <ButtonNextLink href={browseVendorsUrl}>Browse Vendors</ButtonNextLink>
          </div>
        </div>
        {imageUrl && <ResponsiveImage imageUrl={imageUrl} alt="Featured content" />}
      </div>
    </section>
  );
};
