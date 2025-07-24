// Assuming EventDetails component is located at the path: src/components/bookfoodtruck/eventdetailsinfo/EventDetails.tsx

import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/common/card";
import { Button } from "@/components/ui/common/button";
import { EventDetails } from "@/components/Book-Food-Truck/EventDetails"; // Import the EventDetails component
import { ContactInfo } from "@/components/Book-Food-Truck/ContactInfo";

export function BookFoodTruck() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-2">
        <CardTitle>Book A Food Truck</CardTitle>
        <CardDescription>{`Complete the form below and we'll find the perfect food truck for your event.`}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <ContactInfo />

        {/* Replace individual dropdown components with the unified EventDetails component */}
        <EventDetails />

        {/* Use the new BudgetInput component */}

      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Submit</Button>
      </CardFooter>
    </Card>
  );
}
