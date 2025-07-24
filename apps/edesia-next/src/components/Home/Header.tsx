import Link from "next/link";
import Image from "next/image";
import SparkleIcon from "@/components/icons/SparkleIcon";
import UserIcon from "@/components/icons/UserIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";

export function Header() {
  return (
    <header className="relative z-10">
      <div className="container flex items-center justify-between px-4 md:px-6 xl:px-8 h-[72px]">
        <Link href="#" className="flex items-center space-x-2 text-lg font-medium">
          <Image src="/logoRedWide.png" alt="Edesia Logo" width={120} height={40} />
          <span className="sr-only">Edesia</span>
        </Link>
        <nav className="hidden space-x-4 text-base font-medium lg:flex">
          <Link href="/features" className="text-gray-900 hover:underline dark:text-gray-100">Features</Link>
          <Link href="/how-we-work" className="text-gray-900 hover:underline dark:text-gray-100">How It Works</Link>
          <Link href="/pricing" className="text-gray-900 hover:underline dark:text-gray-100">Pricing</Link>
          <Link href="/affiliates" className="text-gray-900 hover:underline dark:text-gray-100">Affiliates</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="/signin"
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm space-x-2 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:border-gray-800"
          >
            <UserIcon className="h-4 w-4" />
            Sign In
          </Link>
          <Link
            href="/getting-started"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow space-x-2 transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            <CalendarIcon className="h-4 w-4" />
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
