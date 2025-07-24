import Link from "next/link";
import React from "react"; // Ensure React is imported if you're using JSX.
import Image from "next/image"; // Import the Image component from next/image


// Define the FoodTruck type if not already defined.
type FoodTruck = {
  name: string;
  cuisine: string;
  imageSrc: string;
};

// Define the props for the FoodTruckList component.
type FoodTruckListProps = {
  trucks: FoodTruck[];
};

// Define and export the FoodTruckList component.
export const FoodTruckList: React.FC<FoodTruckListProps> = ({ trucks }) => (
  <div className="container grid max-w-3xl gap-6 px-4 text-center md:gap-8 lg:gap-10 md:px-6 lg:max-w-5xl xl:gap-12">
    {trucks.map((truck) => (
      <Link key={truck.name} href={`/trucks/${truck.name.toLowerCase().replace(/ /g, '-')}`} legacyBehavior={false}>
        <a className="grid gap-4 p-4 rounded-xl bg-gray-100/30 items-start hover:bg-gray-100/40 dark:bg-gray-800/30 dark:hover:bg-gray-800/40">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">{truck.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{truck.cuisine}</p>
          </div>
          {/* Replace <img> with <Image /> for optimization */}
          <Image alt={truck.name} className="aspect-[2/1] overflow-hidden rounded-lg object-cover object-center" src={truck.imageSrc} />
        </a>
      </Link>
    ))}
  </div>
);
