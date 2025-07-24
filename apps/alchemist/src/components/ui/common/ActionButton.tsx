// app/components/ui/ActionButton.tsx

import Link from "next/link";

interface ActionButtonProps {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}

export const ActionButton = ({ href, label, variant }: ActionButtonProps) => {
  const baseStyle = "inline-flex h-10 items-center justify-center rounded-md text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";
  const primaryStyle = "bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300";
  const secondaryStyle = "border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300";

  return (
    <Link
      className={`${baseStyle} ${variant === "primary" ? primaryStyle : secondaryStyle}`}
      href={href}
    >
      {label}
    </Link>
  );
};
