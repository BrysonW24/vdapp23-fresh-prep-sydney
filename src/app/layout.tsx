import type { Metadata } from 'next';
import { Inter, Mulish } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import { AdProvider } from '@/components/ads/ad-provider';
import { TrackingScripts } from '@/components/analytics/tracking-scripts';
import { CrispChat } from '@/components/analytics/crisp-chat';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Fresh Prep Sydney — Healthy Meal Prep Delivered',
    template: '%s | Fresh Prep Sydney',
  },
  description:
    'Fresh, chef-prepared meals delivered to your door in Sydney. High protein, low carb, plant-based and more. Order weekly or subscribe and save.',
  keywords: [
    'meal prep Sydney',
    'healthy meals delivered',
    'meal delivery Sydney',
    'high protein meals',
    'subscribe and save meals',
    'fresh meal prep',
  ],
  authors: [{ name: 'Fresh Prep Sydney' }],
  creator: 'Fresh Prep Sydney',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://freshprepsydney.com.au',
    title: 'Fresh Prep Sydney — Healthy Meal Prep Delivered',
    description:
      'Fresh, chef-prepared meals delivered to your door in Sydney. Order weekly or subscribe and save.',
    siteName: 'Fresh Prep Sydney',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fresh Prep Sydney — Healthy Meal Prep Delivered',
    description:
      'Fresh, chef-prepared meals delivered to your door in Sydney.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${mulish.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster position="top-right" richColors />
        <AdProvider />
        <TrackingScripts />
        <CrispChat />
      </body>
    </html>
  );
}
