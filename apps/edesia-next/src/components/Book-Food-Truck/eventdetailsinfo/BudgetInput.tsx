// src/components/bookfoodtruck/budgetinput/BudgetInput.tsx

import { Label } from "@/components/ui/common/label";
import { Input } from "@/components/ui/common/input";

export function BudgetInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="budget">
        {`What's your Budget or Minimum*?`}
        <span className="sr-only"> (required)</span>
      </Label>
      <Input id="budget" placeholder="Enter your budget" required />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {`*A minimum is a level of sales you can guarantee`}
      </p>
    </div>
  );
}
