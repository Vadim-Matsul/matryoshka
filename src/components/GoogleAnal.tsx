'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script'
import { useEffect, useState } from 'react';
import { cookieConf } from './CookieConsent';
import { mittEmitter, MittEventBusEvents } from '@/ui/eventBus';


type Props = {}
const NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID = '';
const isDEV = process.env.NODE_ENV === 'development';

export function GoogleAnal({ }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(cookieConf.cookie_accept_key);
    const isCoockieAccept = consent === cookieConf.cookie_accept_value;

    const show = isCoockieAccept && !isDEV
    setShow(show)

    mittEmitter.on(MittEventBusEvents.ACCEPT_COOKIE, () => {
      const show = !isDEV
      setShow(show)
    })

    return () => {
      mittEmitter.off(MittEventBusEvents.ACCEPT_COOKIE)
    };
  }, [])

  if (!show) return null;

  return (
    <>
      <GoogleAnalytics gaId={NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID} />
      <Script id="ga-log" strategy="lazyOnload">
        {`
                console.log("✅ Google Analytics подключен");
              `}
      </Script>
    </>
  )
} 
