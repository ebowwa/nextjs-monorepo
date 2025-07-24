// components/tally/TallyFooter.tsx
import Link from "next/link";
import React from 'react';

const TallyFooter: React.FC = () => (
  <footer className="py-8 px-8 border-t">
    <div className="flex justify-between items-center">
      <span className="text-sm">© 2023 tally</span>
      <div className="space-x-4">
        <Link className="text-sm" href="#">
          Privacy Policy
        </Link>
        <Link className="text-sm" href="#">
          Terms of Service
        </Link>
      </div>
    </div>
  </footer>
);

export default TallyFooter;
