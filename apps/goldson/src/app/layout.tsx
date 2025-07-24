import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goldson Landscaping & Construction Services - Premier Bay Area Home & Commercial Improvement",
  description: "Goldson specializes in comprehensive landscaping, concrete, and construction solutions in the Bay Area. Experience bespoke design and build services for residential and commercial properties. Elevate your space with our expert team dedicated to quality and sustainability. Contact us for custom landscaping, durable concrete projects, and precision construction.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}