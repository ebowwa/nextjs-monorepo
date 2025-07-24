import React from 'react';

// Extend SVG properties to allow for flexibility in usage
interface ChevronLeftIconProps extends React.SVGProps<SVGSVGElement> {}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default ChevronLeftIcon;
