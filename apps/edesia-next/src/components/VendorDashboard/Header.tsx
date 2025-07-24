import Link from "next/link";
import SearchIcon from "@/components/icons/SearchIcon";
import PackageIcon from "@/components/icons/PackageIcon";
import Package2Icon from "@/components/icons/Package2Icon";
import { Button } from "@/components/ui/common/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/common/input";

const Header = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <Link className="lg:hidden" href="#">
        <Package2Icon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full">
        <h1 className="font-semibold text-lg">Recent Orders</h1>
      </div>
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
            placeholder="Search orders..."
            type="search"
            onChange={(event) => {
              // Correctly handling the event with the correct type
              const value = event.target.value;
              // Now you can use 'value' as a string
              console.log(value); // Example action
            }}
          />
        </div>
      </form>
      {/* User Dropdown */}
    </header>
  );
};

export default Header;
