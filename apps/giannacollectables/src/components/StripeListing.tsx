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

const StripeBuyButton: React.FC = () => {
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
    <stripe-buy-button buy-button-id="buy_btn_1OpzuzIaudSdXpO14fmJ37jN" publishable-key="pk_test_51Of8jsIaudSdXpO1WrA2ZpbaWWKd0RcZFUagP782Bpgaeya7CMFMbAf7TxYxKkxZOK4qOGYKMGSdTwh72UOPFrqM000i4x3uXh"></stripe-buy-button>
  );
};

export default StripeBuyButton;