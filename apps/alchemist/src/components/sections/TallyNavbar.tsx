"use client";

// src/components/TallyNavbar.tsx

import React, { useState, useEffect } from 'react';
import { UserProvider } from '@/context/UserContext';
import { usePathname } from 'next/navigation';
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import AuthButtons from '@/components/supabase/AuthButton';

// Define types for content structure
type MenuItemContent = {
  title: string;
  items: ProductItemContent[];
};

type ProductItemContent = {
  title: string;
  description: string;
  href: string;
  bucketId: string;
  imagePath: string;
};

// Create content objects
const menuItemsContent: Record<string, MenuItemContent> = {
  "Getting Started": {
    title: "Getting Started",
    items: [
      {
        title: "Blog",
        description: "Ideal for individuals",
        href: "/blog",
        bucketId: "static",
        imagePath: "ui/basic-plan.png",
      },
      {
        title: "Pricing",
        description: "For professionals",
        href: "/pricing",
        bucketId: "static",
        imagePath: "ui/pro-plan.png",
      },
      {
        title: "Affiliates",
        description: "Solution for organizations",
        href: "/affiliates",
        bucketId: "static",
        imagePath: "ui/enterprise-plan.png",
      },
    ],
  },
  Labs: {
    title: "Labs",
    items: [
      {
        title: "Chat",
        description: "Explore our Chat Lab",
        href: "/chat",
        bucketId: "static",
        imagePath: "ui/chat-image.png",
      },
      {
        title: "Print on Demand",
        description: "Discover our Print on Demand solutions",
        href: "/printondemand",
        bucketId: "static",
        imagePath: "ui/merchondemandlogo.png",
      },
      {
        title: "Resume Assistance",
        description: "coming soon - generative ai meets resume drafting, sign up for our waitlist",
        href: "/resume",
        bucketId: "static",
        imagePath: "ui/newlabfeature-image.png",
      },
    ],
  },
};

const TallyNavbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveItem(null);
  }, [pathname]);

  return (
    <UserProvider>
      <nav className="flex justify-between items-center py-4 px-8 border-b">
        <h1 className="text-2xl font-bold">alchemy</h1>
        <Menu setActive={setActiveItem}>
          {/* Render menu items dynamically */}
          {Object.entries(menuItemsContent).map(([key, content]) => (
            <MenuItem key={key} setActive={setActiveItem} active={activeItem} item={content.title}>
              {/* Render product items dynamically */}
              {activeItem === content.title && (
                <div className="flex flex-col">
                  {content.items.map((item, index) => (
                    <ProductItem
                      key={index}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                      bucketId={item.bucketId}
                      imagePath={item.imagePath}
                    />
                  ))}
                </div>
              )}
            </MenuItem>
          ))}
          <AuthButtons />
        </Menu>
      </nav>
    </UserProvider>
  );
};

export default TallyNavbar;