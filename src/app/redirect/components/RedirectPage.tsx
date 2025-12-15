'use client';

import { pageLinkKeys, pageLinks } from '@/configs/links';
import { gaEvent } from '@/utils/gaEvent';
import { sendYMEvent } from '@/utils/sendYMEvent';
import { waitForGlobal } from '@/utils/waitForGlobal';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

const STORAGE_KEY = 'qr_redirect';
const EVENT_NAME = 'QR_REDIRECT';
const NEXT_PUBLIC_YM_COUNTER_ID = '';

export function RedirectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isServer = typeof window === 'undefined';

  const getPlatform = () => {
    const ua = navigator.userAgent;

    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "MacOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";

    return "Unknown";
  };

  const getUTMParams = () => {
    const result: Record<string, any> = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      result[`utm_${key}`] = value;
    });
    return result;
  };

  const getEventPayload = () => {
    if (isServer) return {};

    const platform = getPlatform();

    const payload = {
      ts: Date.now(),

      // устройство + браузер
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform,

      // экран
      screen: `${window.screen.width}x${window.screen.height}`,
      inner: `${window.innerWidth}x${window.innerHeight}`,

      // сеть
      connection: (navigator as any).connection?.effectiveType || "unknown",

      // часовой пояс
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // UTM-метки
      ...getUTMParams(),

      // кастомные project данные
      page: pathname,
      eventType: EVENT_NAME,
    };

    return payload;
  };

  useEffect(() => {
    if (isServer) return;

    async function sendEvents() {
      const alreadyVisited = Boolean(localStorage.getItem(STORAGE_KEY));
      if (alreadyVisited) {
        router.replace(pageLinks[pageLinkKeys.HOME].href);
        return;
      }

      const gtag = await waitForGlobal("gtag");
      console.log({ gtag })
      const ym = await waitForGlobal("ym");
      console.log({ ym })

      const payload = getEventPayload();

      const isSucessGA = gaEvent(EVENT_NAME, payload);
      const isSucessYA1 = sendYMEvent(
        NEXT_PUBLIC_YM_COUNTER_ID,
        EVENT_NAME,
        payload
      )

      const isSuccess = isSucessGA && isSucessYA1;
      console.log({ isSucessGA, isSucessYA1 });
      if (isSuccess) {
        console.log('Все event отправлены в YA & GA');
        localStorage.setItem(STORAGE_KEY, 'true')
      }

      setTimeout(() => {
        router.replace(pageLinks[pageLinkKeys.HOME].href);
      }, 300)
    }

    sendEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isServer])

  return null;
}
