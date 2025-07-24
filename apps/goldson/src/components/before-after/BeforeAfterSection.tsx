// app/components/before-after/BeforeAfterSection.tsx
import { SectionHeader } from "@/components/before-after/SectionHeader";
import { RenovationHighlights } from "@/components/before-after/RenovationHighlights";
import { ImageShowcase } from "@/components/before-after/ImageShowcase";
import ResponsiveImage from "@/components/ui/ResponsiveImage"; 

// Example static image data
const images = [
  { before: '/concrete/frontwalkway/before/IMG_0288.jpeg', after: '/concrete/frontwalkway/after/IMG_0479.jpeg' },
  { before: '/concrete/apt/before/IMG_0581.jpeg', after: '/concrete/apt/after/IMG_0720.jpeg' },
  // Add more images as necessary
];

export function BeforeAfterSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 grid items-center justify-center gap-4 text-center md:px-6 lg:gap-10">
        <SectionHeader />
        <RenovationHighlights />
        <ImageShowcase images={images} ResponsiveImageComponent={ResponsiveImage} />
      </div>
    </section>
  );
}
