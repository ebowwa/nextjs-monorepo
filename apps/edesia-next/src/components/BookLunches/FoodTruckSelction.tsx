// components/FoodTruckSelection.tsx

import { Input } from "@/components/ui/common/input";
import { Button } from "@/components/ui/common/button";

type SelectionProps = {
  options: string[];
};

export const FoodTruckSelection: React.FC<SelectionProps> = ({ options }) => (
  <div className="py-12 md:py-20 lg:py-24">
    <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="mx-auto grid max-w-sm gap-2 sm:max-w-4xl md:gap-4 lg:max-w-5xl lg:grid-cols-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-4">
            <div className="form-check">
              <Input id={option.toLowerCase().replace(" ", "-")} type="checkbox" />
              <label className="ml-2 text-sm font-medium line-through-when-disabled" htmlFor={option.toLowerCase().replace(" ", "-")}>
                {option}
              </label>
            </div>
          </div>
        ))}
      </div>
      <Button className="mx-auto mt-4 md:mt-8">Order Now</Button>
    </div>
  </div>
);
