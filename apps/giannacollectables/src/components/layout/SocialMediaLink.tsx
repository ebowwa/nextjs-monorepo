// components/SocialMediaLink.tsx
import Link from "next/link";
import React from "react";
import { SocialMediaLinkProps } from '@/types'

export const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ href, ariaLabel, icon }) => (
  <Link
    className="text-xs rounded-full border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors p-2 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50"
    href={href}
  >
    <span className="sr-only">{ariaLabel}</span>
    {icon}
  </Link>
);
