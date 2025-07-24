// app/how-we-work/ProcessDetailCard.tsx
import { CardContent, Card } from "@/components/ui/common/card";

interface ProcessDetailCardProps {
  stepNumber: string;
  title: string;
  description: string;
}

export function ProcessDetailCard({ stepNumber, title, description }: ProcessDetailCardProps) {
  return (
    <Card>
      <CardContent className="p-4 md:p-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{`${stepNumber}. ${title}`}</h3>
          <p className="text-sm text-gray-500 md:text-base dark:text-gray-400">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
