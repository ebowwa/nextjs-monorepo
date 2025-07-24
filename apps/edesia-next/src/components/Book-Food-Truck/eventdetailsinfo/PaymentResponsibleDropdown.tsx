// src/components/bookfoodtruck/eventdetailsinfo/PaymentResponsibleDropdown.tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/common/select";
import { Label } from "@/components/ui/common/label";

export const PaymentResponsibleDropdown = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="payers-select">{`Who's paying?`}</Label>
      <Select required>
        <SelectTrigger id="payers-select">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="host">Host</SelectItem>
          <SelectItem value="attendees">Attendees</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
