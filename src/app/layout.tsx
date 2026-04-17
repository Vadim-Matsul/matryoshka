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
  title: 'Матрёшка | Караоке-бар в Москве на Болотной набережной',
  description: 'Матрёшка — авторский караоке-бар в Москве на Болотной набережной, 3с3. Живая атмосфера, авторская кухня и бар. Бронирование столиков онлайн.',
  keywords: ['Матрёшка', 'Матрешка', 'Москва', 'Болотная набережная', 'бронирование', 'бронирование столика', 'Болотная набережная 3с3', 'авторская кухня', 'ресторан Москва', 'бар Москва', 'авторский ресторан'],
  alternates: {
    canonical: 'https://matreshka-karaoke.ru/',
  },
  openGraph: {
    title: 'Матрёшка | Авторский ресторан и бар в Москве',
    description: 'Авторская кухня, живая атмосфера и бронирование в один клик. Москва, Болотная набережная, 3с3.',
    url: 'https://matreshka-karaoke.ru/',
    siteName: 'Матрёшка',
    images: [
      {
        url: 'https://matreshka-karaoke.ru/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Матрёшка — Авторский ресторан и бар в Москве',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

const GOOGLE_API_KEY = "AIzaSyBjxlpr7fOQhxTUGOgid331JxN-cWQ0t9c";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" >
      <head>
        <YandexAnal />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NightClub",
              "name": "Матрёшка",
              "url": "https://matreshka-karaoke.ru/",
              "telephone": "+74991138226",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Болотная набережная, 3с3",
                "addressLocality": "Москва",
                "addressCountry": "RU"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Friday",
                  "opens": "20:00",
                  "closes": "06:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "20:00",
                  "closes": "06:00"
                }
              ],
              "servesCuisine": "Авторская кухня",
              "priceRange": "₽₽₽"
            })
          }}
        />
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
