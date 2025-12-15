
'use client';

import Script from 'next/script'
import { useEffect, useState } from 'react';
import { cookieConf } from './CookieConsent';
import { mittEmitter, MittEventBusEvents } from '@/ui/eventBus';

const NEXT_PUBLIC_YM_COUNTER_ID = '';
const isDEV = process.env.NODE_ENV === 'development';

type Props = {}

export function YandexAnal({ }: Props) {
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
    <Script
      id="yandex-metrika"
      strategy="lazyOnload"
    >
      {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${NEXT_PUBLIC_YM_COUNTER_ID}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
            console.log("✅ Yandex.Metrika подключен");
          `}
    </Script>
  )
} 
