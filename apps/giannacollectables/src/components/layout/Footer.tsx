import Link from "next/link";
import { SocialMediaLink } from "@/components/layout/SocialMediaLink";
import TwitterIcon from "@/components/icons/TwitterIcon";
import GithubIcon from "@/components/icons/GithubIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <nav className="flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4">Shipping</Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">Returns</Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">Contact Us</Link>
      </nav>
      <div className="flex items-center ml-auto gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4">Terms & Conditions</Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">Privacy Policy</Link>
        <div className="ml-auto flex items-center gap-2">
          <SocialMediaLink href="#" ariaLabel="Twitter" icon={<TwitterIcon className="w-4 h-4" />} />
          <SocialMediaLink href="#" ariaLabel="GitHub" icon={<GithubIcon className="w-4 h-4" />} />
          <SocialMediaLink href="#" ariaLabel="Facebook" icon={<FacebookIcon className="w-4 h-4" />} />
        </div>
      </div>
    </footer>
  );
}
