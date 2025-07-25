import React from 'react';

// Extend SVG properties to allow for flexibility in usage
interface CircleEllipsisIconProps extends React.SVGProps<SVGSVGElement> {}

const CircleEllipsisIcon: React.FC<CircleEllipsisIconProps> = (props) => {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  );
};

export default CircleEllipsisIcon;
