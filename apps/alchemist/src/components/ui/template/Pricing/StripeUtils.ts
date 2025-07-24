'use client';
// src/components/ui/template/Pricing/StripeUtils.ts
import { Price } from '@/types/index'; 
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { useRouter } from 'next/navigation'; 
import { User } from '@supabase/supabase-js';

export const HandleStripeCheckout = async (
  price: Price,
  currentPath: string,
  user: User | null | undefined,
  setPriceIdLoading: (loading: string | undefined) => void,
) => {
  const router = useRouter(); // Correctly using useRouter hook here
  setPriceIdLoading(price.id);

  if (!user) {
    setPriceIdLoading(undefined);
    // Make sure to use the correct path with a leading forward slash for navigation
    return router.push('/signin/signup');
  }

  const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath);

  if (errorRedirect) {
    setPriceIdLoading(undefined);
    // Ensure correct usage of router.push with a forward slash if needed
    return router.push(errorRedirect.startsWith('/') ? errorRedirect : `/${errorRedirect}`);
  }

  if (!sessionId) {
    setPriceIdLoading(undefined);
    // Use router.push for navigation with error handling
    return router.push(
      getErrorRedirect(
        currentPath,
        'An unknown error occurred.',
        'Please try again later or contact a system administrator.'
      )
    );
  }

  const stripe = await getStripe();
  stripe?.redirectToCheckout({ sessionId });
  setPriceIdLoading(undefined);
};
