// src/components/BookLunches/Landing.tsx

import { HeroSection } from '@/components/BookLunches/HeroSection';
import { FoodTruckList } from '@/components/BookLunches/FoodTruckList';
import { FoodTruckSelection } from '@/components/BookLunches/FoodTruckSelction';

export function CommercialA() {
  const trucks = [
    { name: 'Taco Time', cuisine: 'Mexican', imageSrc: '/placeholder.svg' },
    { name: 'Burger Bliss', cuisine: 'American', imageSrc: '/placeholder.svg' },
    { name: 'Sushi Delight', cuisine: 'Japanese', imageSrc: '/placeholder.svg' },
  ];

  const selectionOptions = ['Taco Time', 'Burger Bliss', 'Sushi Delight'];

  return (
    <div className="bg-gray-50/90">
      <HeroSection
        title="Delicious Food Trucks Delivered to Your Business"
        subtitle="Discover a rotating selection of mouthwatering cuisines for your weekly lunches."
      />
      <div className="py-12 md:py-20 lg:py-24">
        <FoodTruckList trucks={trucks} />
      </div>
      <FoodTruckSelection options={selectionOptions} />
    </div>
  );
}
