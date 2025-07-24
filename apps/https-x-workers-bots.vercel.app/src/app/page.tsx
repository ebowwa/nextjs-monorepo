// app/page.tsx
"use client"
import React from 'react';
import SuccessfulCampaigns from '../(clientsubstrate)/components/landingsections/SuccessfulCampaigns';
import ContactUs from '../(clientsubstrate)/components/landingsections/ContactUs';
import HeroSection from '../(clientsubstrate)/components/landingsections/HeroSection';
import ElevatePresence from '../(clientsubstrate)/components/landingsections/ElevatePresence';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection />
        <ElevatePresence />
        <SuccessfulCampaigns />
        <ContactUs />
      </main>
    </div>
  );
};

export default LandingPage;