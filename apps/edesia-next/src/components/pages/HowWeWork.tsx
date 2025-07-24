// app/how-we-work/page.tsx

import { CardContent, Card } from "@/components/ui/common/card";
import { ProcessStep } from "@/components/HowWeWork/ProcessStep";
import { ProcessDetailCard } from "@/components/HowWeWork/ProcessDetailCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionParagraph } from "@/components/ui/SectionParagraph";
import { ActionButton } from "@/components/ui/ActionButton";

export function HowWeWork() {
  const event = "food truck event";

  return (
    <div className="w-full py-12">
      <div className="container grid lg:gap-12 px-4 text-center md:px-6">
        <div className="space-y-3">
          <SectionTitle text="How it works" />
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          <SectionParagraph text={`Our process is simple and transparent. Here's a step-by-step breakdown of how you can book a ${event} for your next event.`} />
        </div>
        <div className="mx-auto max-w-sm space-y-4">
          <ProcessStep stepNumber="1" description="Fill out the form" />
          <ProcessStep stepNumber="2" description="Get a proposal" />
          <ProcessStep stepNumber="3" description="Confirm & pay" />
        </div>
        <div className="mx-auto max-w-2xl space-y-4">
          <ProcessDetailCard stepNumber="1" title="Fill out the Booking Form" description="All questions in the form are necessary for the food trucks to accept a catering gig." />
          <ProcessDetailCard stepNumber="2" title="Food Truck Proposal" description="After filling out the form, you'll receive a confirmation email immediately and can expect a response within 48 hours. We'll present you with food truck options and pricing that fit your preferences." />
          <ProcessDetailCard stepNumber="3" title="Confirm & Pay" description="After receiving the proposal, you can request changes or choose from the suggested food trucks. We'll request a deposit to be made and will facilitate communication between you and your chosen food truck." />
        </div>
        <div className="flex flex-col min-h-[400px] justify-center gap-4 mx-auto max-w-3xl">
          <ActionButton href="#" label="Book A Food Truck For Your Next Event" variant="primary" />
          <ActionButton href="#" label="Please Complete The Form Below" variant="secondary" />
        </div>
      </div>
    </div>
  );
}
