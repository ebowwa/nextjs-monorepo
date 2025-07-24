// app/components/bottomNavigationBar.tsx

import CalendarIcon from "@/components/icons/CalendarIcon";
import TruckIcon from "@/components/icons/TruckIcon";
import MessageCircleIcon from "@/components/icons/MessageCircleIcon";
import UserIcon from "@/components/icons/UserIcon";

export const BottomNavigationBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white py-2">
    <div className="mx-auto flex max-w-screen-md justify-around">
      <CalendarIcon className="text-gray-700" />
      <TruckIcon className="text-red-500" />
      <MessageCircleIcon className="text-gray-700" />
      <UserIcon className="text-gray-700" />
    </div>
  </div>
);
