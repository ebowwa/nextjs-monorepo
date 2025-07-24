// app/components/topNavigationBar.tsx

import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import CircleEllipsisIcon from "@/components/icons/CircleEllipsisIcon";

export const TopNavigationBar = () => (
  <div className="flex items-center justify-between py-2">
    <ChevronLeftIcon className="text-gray-600" />
    <h1 className="text-xl font-semibold">Search</h1>
    <CircleEllipsisIcon className="text-gray-600" />
  </div>
);
