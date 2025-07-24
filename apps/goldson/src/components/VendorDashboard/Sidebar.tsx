import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import MoreHorizontalIcon from "@/components/icons/MoreHorizontalIcon"
import LineChartIcon from "@/components/icons/LineChartIcon"
// import SearchIcon from "@/components/icons/SearchIcon"
// import PackageIcon from "@/components/icons/PackageIcon"
import ShoppingCartIcon from "@/components/icons/ShopingCartIcon"
import HomeIcon from "@/components/icons/HomeIcon"
import Package2Icon from "@/components/icons/Package2Icon"

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span>Acme Inc</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            {/* Navigation Links */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
