// src/components/bookfoodtruck/EventAndCompanyDetailsContactInfo.tsx
import { Label } from "@/components/ui/common/label";
import { Input } from "@/components/ui/common/input";
import { Textarea } from "@/components/ui/common/textarea"; // Import the Textarea component

export const ContactInfo = () => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="event-description">
          Describe your event
          <span className="sr-only"> (required)</span>
        </Label>
        <Textarea id="event-description" placeholder="Enter your description" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <Input id="company" placeholder="Company" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" placeholder="First Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" placeholder="Last Name" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="Phone Number" required />
      </div>
    </>
  );
};

