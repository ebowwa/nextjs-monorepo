// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from '../(clientsubstrate)/components/layout/Navbar';
import Footer from '../(clientsubstrate)/components/layout/Footer'
import React from 'react';
import { BotIcon } from '../(clientsubstrate)/components/icons';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Workers",
  description: "Marketplace for X (digital services i.e. bot detection and purge, to content creators, etc, we want people on our marketplace)",
  openGraph: {
    title: "X Workers",
    description: "Marketplace for X (digital services i.e. bot detection and purge, to content creators, etc, we want people on our marketplace)",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "X Workers",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "X Workers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X Workers",
    description: "Marketplace for X (digital services i.e. bot detection and purge, to content creators, etc, we want people on our marketplace)",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/twitter-card.jpg`],
  },
  icons: {
    icon: {
      url: `data:image/svg+xml;base64,${btoa(
        React.createElement(BotIcon, { className: 'w-6 h-6' }).toString()
      )}`,
      sizes: '24x24',
      type: 'image/svg+xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}