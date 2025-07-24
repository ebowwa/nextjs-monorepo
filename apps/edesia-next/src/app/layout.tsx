import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edesia Catering",
  description: "Streamline event planning with our online platform! Easily book top caterers and food trucks for any occasion. From gourmet to street food, find your perfect match with just a click. Simplify your event catering today",
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