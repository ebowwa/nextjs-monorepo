'use client';
// components/ui/template/Pricing/PricingCard.tsx
// priceString = visable `$#`
import Button from '@/components/ui/template/Button';
import cn from 'classnames';
import { ProductWithPrices, SubscriptionWithProduct, Price, BillingInterval, PricingCardProps } from '@/types/index';

export const PricingCard: React.FC<PricingCardProps> = ({
  product,
  billingInterval,
  handleStripeCheckout,
  priceIdLoading,
  subscription,
}) => {
  const price = product?.prices?.find(
    (price) => price.interval === billingInterval
  );
  if (!price) return null;

  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency!,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return (
    <div
      key={product.id}
      className={cn(
        'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
        {
          'border border-pink-500': subscription
            ? product.name === subscription?.prices?.products?.name
            : product.name === 'Freelancer',
        },
        'flex-1',
        'basis-1/3',
        'max-w-xs'
      )}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold leading-6 text-white">
          {product.name}
        </h2>
        <p className="mt-4 text-zinc-300">{product.description}</p>
        <p className="mt-8">
          <span className="text-5xl font-extrabold text-white"> 
            {priceString}
          </span>
          <span className="text-base font-medium text-zinc-100">
            /{billingInterval}
          </span>
        </p>
        <Button
          variant="slim"
          type="button"
          loading={priceIdLoading === price.id}
          onClick={() => handleStripeCheckout(price)}
          className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
        >
          {subscription ? 'Manage' : 'Subscribe'}
        </Button>
      </div>
    </div>
  );
};
