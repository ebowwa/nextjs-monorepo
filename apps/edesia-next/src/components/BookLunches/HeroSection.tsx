// components/HeroSection.tsx

import Image from 'next/image';

type HeroSectionProps = {
  title: string;
  subtitle: string;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0">
      <Image alt="Food truck hero" layout="fill" objectFit="cover" objectPosition="center" src="/placeholder.svg" />
    </div>
    <div className="bg-gradient-to-b from-gray-50 via-gray-50 to-transparent/80" />
    <div className="py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container px-4 text-center md:px-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-gray-100 dark:text-gray-800">Introducing</p>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{`{title}`}</h1>
          <p className="max-w-[700px] mx-auto text-lg text-gray-200/relaxed dark:text-gray-400">{`{subtitle}`}</p>
        </div>
      </div>
    </div>
  </div>
);
