// app/book-food-truck/page.tsx
"use client";

import { FoodTruckRequest } from '@/components/food-truck-request';
import { BookFoodTruck } from '@/components/pages/BookFoodTruck'; // Adjust the import path as necessary

export default function BookFoodTruckPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 space-y-4">
      <FoodTruckRequest />
    </div>
  );
}
