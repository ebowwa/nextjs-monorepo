// src/components/bookfoodtruck/eventdetailsinfo/EventDetails.tsx
import * as React from "react";
import { AttendeesSelect } from "@/components/Book-Food-Truck/eventdetailsinfo/AttendeeSelect";
import { PaymentResponsibleDropdown } from "@/components/Book-Food-Truck/eventdetailsinfo/PaymentResponsibleDropdown";
import { ServiceNeededDropdown } from "@/components/Book-Food-Truck/eventdetailsinfo/ServiceNeededDropdown";
import { EventLocationInput } from "@/components/Book-Food-Truck/eventdetailsinfo/EventLocationInput";
import { BudgetInput } from "@/components/Book-Food-Truck/eventdetailsinfo/BudgetInput"; // Import the BudgetInput component

export const EventDetails = () => {
  return (
    <form className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Event Details</h2>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the details below to book a food truck for your event.
        </p>
      </div>

      <AttendeesSelect id="attendees-select" />
      <PaymentResponsibleDropdown />
      <ServiceNeededDropdown />
      <EventLocationInput />

      {/* Add the BudgetInput component here */}
      <BudgetInput />
    </form>
  );
};
