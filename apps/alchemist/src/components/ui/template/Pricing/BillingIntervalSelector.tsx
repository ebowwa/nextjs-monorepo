'use client';
// components/ui/template/Pricing/BillingIntervalSelector.tsx
import { BillingInterval } from '@/types/index';

interface BillingIntervalSelectorProps {
  billingInterval: BillingInterval;
  setBillingInterval: (interval: BillingInterval) => void;
  intervals: BillingInterval[];
}

export const BillingIntervalSelector: React.FC<BillingIntervalSelectorProps> = ({
  billingInterval,
  setBillingInterval,
  intervals,
}) => (
  <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
    {intervals.map((interval) => (
      <button
        key={interval}
        onClick={() => setBillingInterval(interval)}
        type="button"
        className={`${billingInterval === interval
            ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
            : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
          } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
      >
        {interval.charAt(0).toUpperCase() + interval.slice(1)} billing
      </button>
    ))}
  </div>
);
