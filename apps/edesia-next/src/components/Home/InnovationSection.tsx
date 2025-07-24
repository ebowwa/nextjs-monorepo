import React from 'react';
import Image from 'next/image'; // Import Image component from next/image
import CalendarCheckIcon from '@/components/icons/CalendarCheckIcon';
import SmartphoneIcon from '@/components/icons/SmartphoneIcon';
import ChefHatIcon from '@/components/icons/ChefHatIcon';

interface Feature {
  Icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    Icon: CalendarCheckIcon,
    title: 'Effortless Planning',
    description: 'Simplify the coordination of vendors and menus with intuitive planning tools.',
  },
  {
    Icon: SmartphoneIcon,
    title: 'Real-Time Communication',
    description: 'Facilitate seamless interaction between organizers and vendors with integrated messaging.',
  },
  {
    Icon: CalendarCheckIcon, // Use the correct icon for each feature
    title: 'Streamlined Payments',
    description: 'Enable secure and convenient transactions for customers with automated payment processing.',
  },
  {
    Icon: ChefHatIcon,
    title: 'Culinary Showcase',
    description: 'Highlight the diverse culinary offerings of your event with a customizable digital showcase.',
  },
];

export const InnovationSection = () => {
  return (
    <section className="border-t border-b">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12 xl:px-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Platform for Culinary Innovation
            </h2>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
              Edesia offers a seamless experience for event organizers and vendors, providing the tools and connectivity needed to elevate every occasion.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-8">
            {features.map(({ Icon, title, description }) => (
              <div className="flex items-center space-x-4" key={title}>
                <Icon className="h-8 w-8" />
                <div className="space-y-1">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image // Replace <img> with <Image />
          alt="Image"
          className="mx-auto  overflow-hidden rounded-xl object-cover object-center lg:order-last"
          src="/phone-demo.png" // Replace with the actual image path
          width={350} // Specify width without quotes
          height={250} // Specify height without quotes
        />
      </div>
    </section>
  );
};
