export interface IconProps extends React.SVGProps<SVGSVGElement> {}

export interface ProductCardProps {
    title: string;
    price: string;
    imageUrl: string;
  }

export interface SocialMediaLinkProps {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}
