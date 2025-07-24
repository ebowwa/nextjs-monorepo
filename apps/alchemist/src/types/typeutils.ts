// types/utils.ts
import React, { ReactNode } from 'react';
import { Tables } from '../../types_db';
import { User } from '.'

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
}

export type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

export interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export interface IPreProps {
  children: React.ReactElement<{ className?: string; children: string }>;
}

export type AnchorProps = {
  href: string;
  children: React.ReactNode;
};

export interface IMarkdownViewerProps {
  text: string;
}

export type OutsideClickHandlerProps = {
  children: ReactNode;
  onOutsideClick: () => void;
};

export interface NoMediaMessageProps {
  mediaDataList: Array<{ data: string | null }>;
}

export interface RefreshButtonProps {
  loading: boolean;
  onRefresh: () => void;
}

export interface ResultDisplayProps {
  result: string;
  loading: boolean;
}

export interface UserQuestionDisplayProps {
  userQuestion: string;
  loading: boolean;
  onRefresh: () => void;
}

export interface FileInputProps {
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ScrollingSvgProps {
  svgHeight: number;
  y1: number;
  y2: number;
}

export type BillingInterval = 'lifetime' | 'year' | 'month';

export type Subscription = Tables<'subscriptions'>;
export type Product = Tables<'products'>;
export type Price = Tables<'prices'>;

export interface ProductWithPrices extends Product {
  prices: Price[];
}

export interface PriceWithProduct extends Price {
  products: Product | null;
}

export interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

export interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export interface SignInButtonProps {
  isSubmitting: boolean;
  disableButton?: boolean;
}

export interface EmailInputProps {
  id: string;
  placeholder: string;
  name: string;
}

export interface ForgotPasswordFormProps {
  disableButton?: boolean;
}

export interface PasswordSignInEmailInputProps {
  id: string;
  placeholder: string;
}

export interface PasswordSiginPasswordInputProps {
  id: string;
  placeholder: string;
}

export interface Playground {
  id: string;
  title: string;
  description: string;
  previewImageSrc: string;
  href: string;
}

export interface PricingCardProps {
  product: ProductWithPrices;
  billingInterval: BillingInterval;
  handleStripeCheckout: (price: Price) => Promise<void>;
  priceIdLoading: string | undefined;
  subscription: SubscriptionWithProduct | null;
}

