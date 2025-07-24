// src/components/bookfoodtruck/eventdetailsinfo/AttendeeSelect.tsx
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/common/select"; // Adjust the import path based on your project structure

interface AttendeesSelectProps {
  id: string; // Prop for dynamically setting the ID for accessibility
}

// AttendeesSelect Component
export const AttendeesSelect: React.FC<AttendeesSelectProps> = ({ id }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        Number of Attendees<span className="sr-only"> (required)</span>
      </label>
      <Select required>
        <SelectTrigger aria-labelledby={id} className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="less-than-100">Less than 100</SelectItem>
          <SelectItem value="100-300">100-300</SelectItem>
          <SelectItem value="300-500">300-500</SelectItem>
          <SelectItem value="500-1000">500-1000</SelectItem>
          <SelectItem value="more-than-1000">More than 1000</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
