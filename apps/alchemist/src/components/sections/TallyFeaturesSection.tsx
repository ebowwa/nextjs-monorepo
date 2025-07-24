// components/tally/TallyFeaturesSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/common/card";
import { Button } from "@/components/ui/common/button";
import { Badge } from "@/components/ui/common/badge";
import { Input } from "@/components/ui/common/input";
import React from 'react';

const TallyFeaturesSection: React.FC = () => (
  <>
    <section className="px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent>
            <Input placeholder="Form title" />
          </CardContent>
        </Card>
        <div className="flex justify-center space-x-2 mb-4">
          <Badge variant="secondary">Notion</Badge>
          <Badge variant="secondary">make</Badge>
          <Badge variant="secondary">Paystack</Badge>
          <Badge variant="secondary">Glovo</Badge>
        </div>
        <Button variant="outline">Product Hunt</Button>
      </div>
    </section>
    <section className="bg-[#F9F5FF] py-16 px-8">
      {/* Similar structure for other cards and content */}
    </section>
    {/* Additional sections can be added here */}
  </>
);

export default TallyFeaturesSection;
