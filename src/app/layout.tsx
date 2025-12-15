import type { Metadata } from 'next';
import { Inter, Baskervville, Jost } from 'next/font/google';
import 'swiper/css';
import 'react-medium-image-zoom/dist/styles.css'
import '../style/globals.css';
import 'normalize.css'
import { cn } from '@/utils/cn';
import { Providers } from './providers';
import Script from 'next/script';
import { CookieConsent } from '@/components/CookieConsent';
import { GoogleAnal } from '@/components/GoogleAnal';
import { YandexAnal } from '@/components/YandexAnal';


const jostFont = Jost({
  variable: '--font-jost',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'МАТРЁШКА | Пусть она попоет в твой микрофон',
  description: '«Матрёшка» в центре Москвы — это ночи без пауз, профессиональный звук, яркая атмосфера и лучшие хиты. Место, где голос становится главным героем, а вечер — незабываемым.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <head>
        <YandexAnal />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          jostFont.variable,
          'antialiased bg-custom-black-100 text-custom-white-100'
        )}
      >
        <Providers>
          {children}
        </Providers>

        <CookieConsent />
        <GoogleAnal />
      </body>
    </html>
  );
}
