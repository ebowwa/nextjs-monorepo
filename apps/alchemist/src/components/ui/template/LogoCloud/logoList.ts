// logoList.ts (content object with type definition)
export type LogoItem = {
    url: string;
    label: string;
    imageSrc: string;
    imageAlt: string;
    imageClassName: string;
  };
  
  export const logoList: LogoItem[] = [
    {
      url: 'https://nextjs.org',
      label: 'Next.js Link',
      imageSrc: '/nextjs.svg',
      imageAlt: 'Next.js Logo',
      imageClassName: 'h-6 sm:h-12 text-white',
    },
    {
      url: 'https://vercel.com',
      label: 'Vercel.com Link',
      imageSrc: '/vercel.svg',
      imageAlt: 'Vercel.com Logo',
      imageClassName: 'h-6 text-white',
    },
    {
      url: 'https://stripe.com',
      label: 'stripe.com Link',
      imageSrc: '/stripe.svg',
      imageAlt: 'stripe.com Logo',
      imageClassName: 'h-12 text-white',
    },
    {
      url: 'https://supabase.io',
      label: 'supabase.io Link',
      imageSrc: '/supabase.svg',
      imageAlt: 'supabase.io Logo',
      imageClassName: 'h-10 text-white',
    },
    {
      url: 'https://github.com',
      label: 'github.com Link',
      imageSrc: '/github.svg',
      imageAlt: 'github.com Logo',
      imageClassName: 'h-8 text-white',
    },
  ];
  