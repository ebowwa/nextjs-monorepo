// src/components/bookfoodtruck/eventdetailsinfo/event-location-input.tsx
"use client";

import { Input } from "@/components/ui/common/input";
import { Label } from "@/components/ui/common/label";

export function EventLocationInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="event-location">Event location *</Label>
      <Input id="event-location" type="text" placeholder="Enter location" />
    </div>
  );
}
