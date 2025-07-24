// components/Header.tsx
import Link from "next/link";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import HeartIcon from "@/components/icons/HeartIcon";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center">
        <HeartIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <ContextMenu>
          <ContextMenuTrigger className="text-sm font-medium hover:underline underline-offset-4">
            Shop
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem>Shop Now</ContextMenuItem>
            <ContextMenuItem>Special Offers</ContextMenuItem>
            <ContextMenuItem>Clearance</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu>
          <ContextMenuTrigger className="text-sm font-medium hover:underline underline-offset-4">
            About
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem>About Us</ContextMenuItem>
            <ContextMenuItem>Our Story</ContextMenuItem>
            <ContextMenuItem>Team</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu>
          <ContextMenuTrigger className="text-sm font-medium hover:underline underline-offset-4">
            Blog
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem>Latest Posts</ContextMenuItem>
            <ContextMenuItem>Tips & Tricks</ContextMenuItem>
            <ContextMenuItem>News</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu>
          <ContextMenuTrigger className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem>Contact Us</ContextMenuItem>
            <ContextMenuItem>Support</ContextMenuItem>
            <ContextMenuItem>Feedback</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </nav>
    </header>
  );
};

export default Header;
