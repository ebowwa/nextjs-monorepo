// components/ProductCard.tsx
import React from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/common/button";
import { ProductCardProps } from "@/types/index";

export const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price }) => (
  <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg overflow-hidden">
    <Image alt="Product Image" className="aspect-square object-cover object-center" src={imageUrl} />
    <div className="space-y-2 p-4 w-full">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{price}</p>
    </div>
    <Button>View Item</Button>
  </div>
);
