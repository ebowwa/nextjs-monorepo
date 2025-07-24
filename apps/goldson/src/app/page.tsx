import Image from "next/image";
// Ensure the component name starts with a capital letter
// Change this in src/app/page.tsx or wherever you're trying to import it
// src/app/page.tsx
import { HomePage } from '@/components/pages/HomePage';

export default function Home() {
  return (
    // Use the corrected component name with proper TSX syntax
    <HomePage />
  );
}
