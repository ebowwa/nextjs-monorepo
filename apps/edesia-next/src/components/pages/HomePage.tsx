"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Home/Header";
import { FeatureSection } from "@/components/Home/FeatureSection";
import { FormSection } from "@/components/Home/FormSection";
import { InnovationSection } from "@/components/Home/InnovationSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import dynamic from "next/dynamic";

// Dynamically import the DynamicTextComponent with SSR disabled
const DynamicTextComponent = dynamic(
  () => import('@/components/ui/typewriter/dynamic'),
  { ssr: false }
);

const HomePageContent = () => {
  const dynamicTitles = ['Food Trucks', 'Catering Options', 'Street Food Vendors', 'Pop-Up Markets'];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <SectionWrapper>
          <FeatureSection
            title={<DynamicTextComponent categories={dynamicTitles} />}
            description="Your community has many nice people, who offer very generalized services, let's help connect you. Book today."
            imageUrl="FoodVendor.svg"
            bookNowUrl="/booking"
            browseVendorsUrl="/vendors"
          />
        </SectionWrapper>
        <SectionWrapper>
          <InnovationSection />
        </SectionWrapper>
        <SectionWrapper>
          <FormSection
            title="Get your FREE Food Truck Booking Guide"
            description="Become an expert booking food truck with this guide. It will cover how to source vendors, agreements, and pricing"
            buttonText="Download Guide"
          />
        </SectionWrapper>
      </main>
    </div>
  );
};

export function HomePage() {
  // No need to use useEffect for client-side rendering of the whole component
  return <div id="home-page-root"><HomePageContent /></div>;
}
