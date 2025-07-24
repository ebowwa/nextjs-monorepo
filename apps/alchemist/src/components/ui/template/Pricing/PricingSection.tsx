// src/components/ui/template/PricingSection.tsx

import React from 'react';
import Button from '@/components/ui/template/Button';
import LogoCloud from '@/components/ui/template/LogoCloud';
import cn from 'classnames';
import type { User } from '@supabase/supabase-js';
import type { Tables } from '../../../../../types_db';
import type { BillingInterval, ProductWithPrices, SubscriptionWithProduct } from '@/types/index';

interface PricingSectionProps {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  billingInterval: BillingInterval;
  setBillingInterval: React.Dispatch<React.SetStateAction<BillingInterval>>;
  handleStripeCheckout: (price: Tables<'prices'>) => Promise<void>;
  priceIdLoading: string | undefined;
}

interface PricingSectionContent {
  title: string;
  description: string;
  intervalButtons: {
    monthly: string;
    yearly: string;
  };
  emptyStateMessage: {
    title: string;
    linkText: string;
    linkUrl: string;
  };
}

const pricingSectionContent: PricingSectionContent = {
  title: 'Pricing Plans',
  description:
    'Start building for free, then add a site plan to go live. Account plans unlock additional features.',
  intervalButtons: {
    monthly: 'Monthly billing',
    yearly: 'Yearly billing',
  },
  emptyStateMessage: {
    title: 'No subscription pricing plans found. Create them in your',
    linkText: 'Stripe Dashboard',
    linkUrl: 'https://dashboard.stripe.com/products',
  },
};

const PricingSection: React.FC<PricingSectionProps> = ({
  user,
  products,
  subscription,
  billingInterval,
  setBillingInterval,
  handleStripeCheckout,
  priceIdLoading,
}) => {
  const renderEmptyState = () => (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          {pricingSectionContent.emptyStateMessage.title}{' '}
          <a
            className="text-pink-500 underline"
            href={pricingSectionContent.emptyStateMessage.linkUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {pricingSectionContent.emptyStateMessage.linkText}
          </a>
          .
        </p>
      </div>
      <LogoCloud />
    </section>
  );

  const renderIntervalButtons = () => (
    <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
      {/* Render interval buttons */}
    </div>
  );

  const renderProducts = () => (
    <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
      {/* Map and render products */}
    </div>
  );

  if (!products.length) {
    return renderEmptyState();
  }

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            {pricingSectionContent.title}
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            {pricingSectionContent.description}
          </p>
          {renderIntervalButtons()}
        </div>
        {renderProducts()}
        <LogoCloud />
      </div>
    </section>
  );
};

export default PricingSection;