import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import 'swiper/css';
import 'react-medium-image-zoom/dist/styles.css'
import '../style/globals.css';
import 'normalize.css'
import { cn } from '@/utils/cn';
import { Providers } from './providers';
import Script from 'next/script';
import { CookieConsent } from '@/analyst/CookieConsent';
import { YandexAnal } from '@/analyst/YandexAnal';
import { RoistatAnal } from '@/analyst/RoistatAnal';

const jostFont = Jost({
  variable: '--font-jost',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Матрёшка | Караоке-бар с русским характером',
  description: 'Пространство, в котором каждый гость становится частью большой истории'
};

const GOOGLE_API_KEY = "AIzaSyBjxlpr7fOQhxTUGOgid331JxN-cWQ0t9c";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <YandexAnal />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`}
          type='text/javascript'
          strategy="afterInteractive"
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          jostFont.variable,
          'antialiased bg-custom-black-100 text-custom-white-100'
        )}
      >
        <RoistatAnal />
        <Providers>
          {children}
        </Providers>

        <CookieConsent />
      </body>
    </html>
  );
}
