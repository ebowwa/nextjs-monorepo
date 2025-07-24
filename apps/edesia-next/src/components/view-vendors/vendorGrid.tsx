// app/components/vendorGrid.tsx
"use client";
import React from "react";
import useSWR from 'swr';
import { collection, getDocs, query, where } from "firebase/firestore";
import { VendorCard } from "./vendorCard";
import { db } from "@/components/firebase";
import { z } from "zod";

// Define the Zod schema for validation
const VendorSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});
const VendorsSchema = z.array(VendorSchema);

// Creating a fetcher function for use with SWR
const fetchVendors = async () => {
  const vendorsCol = collection(db, "FoodTrucks");
  const vendorSnapshot = await getDocs(vendorsCol);
  const vendors = vendorSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  // Validate the data with Zod before returning
  return VendorsSchema.parse(vendors);
};

export const VendorGrid: React.FC = () => {
  const { data: vendors, error } = useSWR('vendors', fetchVendors);

  if (error) return <div>Failed to load</div>;
  if (!vendors) return <div>Loading...</div>;

  return (
    <div className="mt-4 space-y-6 grid grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <VendorCard
          key={vendor.id}
          title={vendor.name}
          description={vendor.description}
          category={vendor.category}
          image={vendor.image}
        />
      ))}
    </div>
  );
};
