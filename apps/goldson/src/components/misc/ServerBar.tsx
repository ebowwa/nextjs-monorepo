// app/components/server-bar.tsx

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

export const ServerBar = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="attendees">Number of Attendees</Label>
      <RadioGroup defaultValue="100-300">
        <div className="grid grid-cols-5 items-center gap-4">
          <div>
            <RadioGroupItem id="attendees-1" value="<100" />
            <Label
              className="text-sm not-italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="attendees-1"
            >
              {"<100"}
            </Label>
          </div>
          <div>
            <RadioGroupItem id="attendees-2" value="100-300" />
            <Label
              className="text-sm not-italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="attendees-2"
            >
              100-300
            </Label>
          </div>
          <div>
            <RadioGroupItem id="attendees-3" value="300-500" />
            <Label
              className="text-sm not-italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="attendees-3"
            >
              300-500
            </Label>
          </div>
          <div>
            <RadioGroupItem id="attendees-4" value="500-1000" />
            <Label
              className="text-sm not-italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="attendees-4"
            >
              500-1000
            </Label>
          </div>
          <div>
            <RadioGroupItem id="attendees-5" value=">1000" />
            <Label
              className="text-sm not-italic peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="attendees-5"
            >
              {">1000"}
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};
