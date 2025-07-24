"use client";
import React from "react";
import { Header } from "@/components/Home/Header";
import { FeatureSection } from "@/components/Home/FeatureSection";
import { FormSection } from "@/components/Home/FormSection";
import { InnovationSection } from "@/components/Home/InnovationSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import dynamic from "next/dynamic";
import { BeforeAfterSection } from "@/components/before-after/BeforeAfterSection"; 

const DynamicTextComponent = dynamic(() => import('@/components/ui/typewriter/dynamic'), { ssr: false });

const HomePageContent = () => {
  const dynamicTitles = [
    `the best in Landscaping in the Bay Area`,
    `Unmatched Concrete Designs and Construction Results`,
    `Your Dream Backyard`,
    `Garden Oasis&apos;s `, 
    `Outdoor Spaces`,
    `Accessible Luxury`,
    `Community-Focused Projects`,
    `Eco-Friendly Urban Retreats`,
    `Versatile Living Spaces`
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <SectionWrapper>
          <FeatureSection
            title={<DynamicTextComponent categories={dynamicTitles} />}
            description={
              <div>
                <p style={{ marginBottom: '1rem' }}>Goldson&apos;s is where your vision comes to life. We blend nature with design to make your space stand out. Our team is all about getting the details right &mdash; from the green of your garden to the strength of your structures.</p>
                <p style={{ marginBottom: '1rem' }}>Ready to change your view? Book a consultation with us.</p>
              </div>
            }
            imageUrl="/tanBG_home.png"
            bookNowUrl="/booking"
            browseVendorsUrl="/gallery"
          />
        </SectionWrapper>
        <SectionWrapper>
          <BeforeAfterSection /> 
        </SectionWrapper>
      </main>
    </div>
  );
};

export function HomePage() {
  return <HomePageContent />;
}

