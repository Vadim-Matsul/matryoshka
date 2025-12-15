'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { pageLinkKeys, pageLinks } from '@/configs/links';
import { mittEmitter, MittEventBusEvents } from '@/ui/eventBus';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';

export const cookieConf = {
  cookie_accept_key: 'cookie_consent',
  cookie_accept_value: 'accepted',
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(cookieConf.cookie_accept_key);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(cookieConf.cookie_accept_key, cookieConf.cookie_accept_value);
    setVisible(false);

    mittEmitter.emit(MittEventBusEvents.ACCEPT_COOKIE)
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[linear-gradient(90.67deg,#BC0123_-9.32%,#550A16_93.63%)] text-white p-4 1_5xl:p-6 1_5xl:px-8 shadow-lg">
      <div className={cn(
        "flex flex-col gap-5",
        'md:flex-row md:items-center md:justify-between',
        '1_5xl:max-w-[1440px] 1_5xl:mx-auto',

      )}>
        <p className="text-sm leading-snug xl:text-[18px] xl:leading-[22px]">
          Продолжая использовать наш сайт, вы даете согласие на обработку файлов Cookies и других пользовательских данных, в соответствии с&nbsp;
          <a
            href={pageLinks[pageLinkKeys.PRIVACY_POLICY].href}
            target='_blank'
            className='underline'
          >
            Политикой конфиденциальности
          </a>
        </p>

        <div
          className={cn(
            'rounded-[30px] overflow-hidden ',
            'hover:scale-[.95] focus:scale-[.95] transition-all',
            'w-full rounded-[90px]',
            'md:min-w-[320px] md:max-w-[320px]',
            'xl:min-w-[450px] xl:max-w-[450px]',
          )}
        >
          <StarBorder
            as="button"
            onClick={acceptCookies}
            speed="3s"
            thickness={1.5}
            className={cn(
              'cursor-pointer pb-0.5'
            )}
          >
            <div
              className={cn(
                'bg-[linear-gradient(45deg,#B30122_0%,#ffffff40_60%,#B30122_100%)] ',
                'relative inline-flex rounded-[30px] p-[1px]',
                'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.30)]',
                'w-full',
                cn(
                  'h-[42px]',
                )
              )}
            >
              <div
                className={cn(
                  'w-full h-full rounded-[30px] bg-custom-black-100',
                  'flex items-center justify-center'
                )}
              >
                <p>
                  Согласен
                </p>
              </div>
            </div>
          </StarBorder>
        </div>

        {/* <button
          onClick={acceptCookies}
          className={cn(
            'bg-transparent text-custom-white-200 cursor-pointer',
            'w-full rounded-[90px]',
            'border-[1px] border-custom-white-200',
            'flex items-center justify-center',
            'h-[42px]',
            'md:min-w-[320px] md:max-w-[320px]',
            'xl:min-w-[450px] xl:max-w-[450px]',
          )}
        >
          <p
            className={cn(
              'font-geist font-semibold leading-none',
              'text-[16px]'
            )}
          >
            Согласен
          </p>
        </button> */}
      </div>
    </div>
  );
}
