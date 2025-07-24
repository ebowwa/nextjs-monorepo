// src/components/bookfoodtruck/eventdetailsinfo/ServiceNeededDropdown.tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/common/select";
import { Label } from "@/components/ui/common/label";

export const ServiceNeededDropdown = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="service-needed">Service Needed</Label>
      <Select>
        <SelectTrigger id="service-needed">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="food-truck">Food Truck service</SelectItem>
          <SelectItem value="drop-off">Drop Off</SelectItem>
          <SelectItem value="catering">Catering</SelectItem>
          <SelectItem value="buffet">Buffet</SelectItem>
          <SelectItem value="unsure">Unsure</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
