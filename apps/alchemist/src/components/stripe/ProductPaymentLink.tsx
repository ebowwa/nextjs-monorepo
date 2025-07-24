import React, { useEffect } from 'react';

// Extend JSX.IntrinsicElements to include 'stripe-buy-button'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}

// Define a TypeScript interface for the component props
interface StripeBuyButtonProps {
  buyButtonId: string;
  publishableKey: string;
}

const StripeBuyButton: React.FC<StripeBuyButtonProps> = ({ buyButtonId, publishableKey }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <stripe-buy-button buy-button-id={buyButtonId} publishable-key={publishableKey}></stripe-buy-button>
  );
};

export default StripeBuyButton;

// <StripeBuyButton buyButtonId="buy_btn_1OpzuzIaudSdXpO14fmJ37jN" publishableKey="pk_test_51Of8jsIaudSdXpO1WrA2ZpbaWWKd0RcZFUagP782Bpgaeya7CMFMbAf7TxYxKkxZOK4qOGYKMGSdTwh72UOPFrqM000i4x3uXh" />
