// Assuming ResponsiveImage has been corrected to use src instead of imageUrl

import React from 'react';
import  ResponsiveImage  from '@/components/ui/ResponsiveImage'; // Ensure correct import

type ImagePair = {
  before: string;
  after: string;
};

type ImageShowcaseProps = {
  images: ImagePair[];
  ResponsiveImageComponent: typeof ResponsiveImage;
};

export function ImageShowcase({ images, ResponsiveImageComponent }: ImageShowcaseProps) {
  return (
    <div className="max-w-sm mx-auto grid gap-2 md:max-w-none md:grid-cols-2 lg:grid-cols-2xl xl:gap-4">
      {images.map((image, index) => (
        <ShowcaseImage key={index} before={image.before} after={image.after} ResponsiveImageComponent={ResponsiveImageComponent} />
      ))}
    </div>
  );
}

type ShowcaseImageProps = ImagePair & {
  ResponsiveImageComponent: typeof ResponsiveImage;
};

function ShowcaseImage({ before, after, ResponsiveImageComponent }: ShowcaseImageProps) {
  // This structure assumes a hover effect to switch between before and after images using opacity
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <ResponsiveImageComponent src={after} alt="After" className="object-cover rounded-md w-full h-auto" />
        <span className="text-8xl font-extrabold text-gray-50 bg-black bg-opacity-50 p-1 rounded" style={{ textShadow: '2px 2px 10px rgba(0,0,0,1)', transform: 'translateY(-20%)' }}>After</span>
      </div>
      <ResponsiveImageComponent src={before} alt="Before" className="object-cover object-top w-full h-auto transition-transform group-hover:scale-110" />
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <span className="text-8xl font-extrabold text-gray-50" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.85)' }}>Before</span>
      </div>
    </div>
  );
}
