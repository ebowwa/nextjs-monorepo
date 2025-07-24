import React from 'react';
import Link from 'next/link';
import { BotIcon } from '../icons';
import navbarData from '../../../../public/html/navbar.json';

const Navbar: React.FC = () => {
  return (
    <div className="px-4 lg:px-6 h-20 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <BotIcon className="h-10 w-10" />
        <span className="sr-only text-xl">{navbarData.logo.altText}</span>
      </Link>
      <nav className="ml-auto flex gap-8 sm:gap-10">
        {navbarData.links.map((link, index) => (
          <Link
            key={index}
            className="text-lg font-medium hover:underline underline-offset-4"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;