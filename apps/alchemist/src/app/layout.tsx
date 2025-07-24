import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Providers } from '@/providers';
import { Toaster } from '@/components/ui/template/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import { UserProvider } from '@/context/UserContext';
import {
  NEXT_SITE_TITLE,
  NEXT_SITE_DESCRIPTION,
  cardImage,
  robots,
  favicon,
  referrer,
  keywords,
  authors,
  creator,
  publisher,
  twitterCard,
  twitterSite,
  twitterCreator,
  ogType
} from '@/lib/constants';

// Global CSS
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Metadata definitions
const baseMeta = {
  title: NEXT_SITE_TITLE,
  description: NEXT_SITE_DESCRIPTION,
  cardImage,
  robots,
  favicon,
  url: getURL()
};

async function generateMetadata(): Promise<Metadata> {
  return {
    title: baseMeta.title,
    description: baseMeta.description,
    referrer,
    keywords,
    authors,
    creator,
    publisher,
    robots: baseMeta.robots,
    icons: { icon: baseMeta.favicon },
    metadataBase: new URL(baseMeta.url),
    openGraph: {
      url: baseMeta.url,
      title: baseMeta.title,
      description: baseMeta.description,
      images: [baseMeta.cardImage],
      type: ogType,
      siteName: baseMeta.title
    },
    twitter: {
      card: twitterCard,
      site: twitterSite,
      creator: twitterCreator,
      title: baseMeta.title,
      description: baseMeta.description,
      images: [baseMeta.cardImage]
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`loading ${inter.className}`}>
        <UserProvider>
          {/* Wrap the application's components with UserProvider */}
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Providers>
              {/* Navbar removed */}
              <main id="skip" className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
                {children}
              </main>
              {/* Footer removed */}
              <Suspense fallback={<div>Loading...</div>}>
                <Toaster />
              </Suspense>
            </Providers>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}