// app/how-we-work/ProcessStep.tsx
import TruckIcon from "@/components/icons/TruckIcon";

interface ProcessStepProps {
  stepNumber: string;
  description: string;
}

export function ProcessStep({ stepNumber, description }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="rounded-full border w-12 h-12 border-gray-200 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <TruckIcon className="w-6 h-6 translate-x-0.5 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold">{`${stepNumber}. ${description}`}</h3>
    </div>
  );
}
