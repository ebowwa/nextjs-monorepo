// Assuming the useViewportSize hook is correctly implemented as previously shown
// src/components/ui/ResponsiveImage.tsx
import { useViewportSize } from '@/components/ui/useViewportSize';
import Image from "next/image";
import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  // Add other props as needed
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt }) => {
  const { width, height } = useViewportSize();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={width}
        height={height}
        objectFit="cover"
        className="rounded-xl"
      />
    </div>
  );
};

export default ResponsiveImage;
