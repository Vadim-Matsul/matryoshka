import { AnimatedImage } from '@/bits/AnimatedImage'
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder'
import { BlurText } from '@/bits/BlurText'
import { FadeContent } from '@/bits/FadeContent'
import { SplitText } from '@/bits/SplitText'
import { YandexMapIcon } from '@/components/icons/YandexMapIcon'
import { PlacesModalNextSteps } from '@/components/modals/places_modal/config'
import { matryoshka } from '@/configs/matryoshka'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { getMoscowDay } from './PlacesMap'


type Props = {}

export function Intro({ }: Props) {

  return (
    <>
      <section
        className={cn(
          'relative',
          'h-[700px] sm:h-[850px]',
          'w-full rounded-b-2xl overflow-hidden',
        )}
      >
        <div
          className={cn(
            '1_5xl:w-[1440px] 1_5xl:mx-auto',
            'w-full h-full relative z-[2]',
            'flex justify-end flex-col',
          )}
        >
          <div
            className={cn(
              'relative z-[5]',
              'mb-[30px]',
              'flex flex-col gap-3 tracking-[2px] uppercase',
              'text-[12px] leading-[12px] opacity-50 font-medium',
              'md:text-[14px] md:leading-[14px] md:gap-4 md:mb-[40px]',
              '1_5lg:text-[16px] 1_5lg:leading-[16px] 1_5lg:gap-5 1_5lg:mb-[50px]',
            )}
          >
            <a
              href={matryoshka.adress.href}
              target='_blank'
              className={cn(
                'flex items-center text-custom-white-101 whitespace-nowrap w-min mx-auto gap-2',
              )}
            >
              {matryoshka.adress.name}
            </a>

            <a
              href={matryoshka.phone.href}
              className='text-custom-white-101 whitespace-nowrap w-min mx-auto'
            >
              {matryoshka.phone.str}
            </a>

            {getMoscowDay() !== 'other' && (
              <p
                className='text-custom-white-101 whitespace-nowrap w-min mx-auto'
              >
                Сегодня до {getMoscowDay() === 'thursday' ? '03:00' : '05:00'}
              </p>
            )}
          </div>

          <div
            className={cn(
              'absolute left-0 bottom-0 right-0 z-[2]',
              'h-[40%]',
              'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
            )}
          />
        </div>

        <div
          className={cn(
            'absolute inset-0 z-[1] overflow-hidden',
            '1_5xl:w-[1440px] 1_5xl:mx-auto rounded-b-2xl overflow-hidden'
          )}
        >
          <video
            autoPlay
            loop
            controls={false}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            className="w-full bg-video h-full object-cover relative z-[2]"
          >
            <source src="/videos/intro_desktop.mp4" media="(min-width: 1024px)" />
            <source src="/videos/intro_mobile.mp4" />
          </video>

          {/* <video
            src='/videos/intro.mp4'
            autoPlay
            loop
            muted
            controls={false}
            className='w-full h-full object-cover'
          /> */}

          {/* <div
            className={cn(
              'absolute left-0 top-0 bottom-0 z-[2]',
              'w-[20%]',
              'bg-gradient-to-l from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
            )}
          />
          <div
            className={cn(
              'absolute right-0 top-0 bottom-0 z-[2]',
              'w-[20%]',
              'bg-gradient-to-r from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
            )}
          />
          <div
            className={cn(
              'absolute left-0 right-0 bottom-0 z-[2]',
              'h-[85%] sm:h-[50%] lg:h-[45%] 1_5xl:h-[60%]',
              'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
            )}
          />
          <div
            className={cn(
              'hidden lg:block',
              'absolute left-0 right-0 top-0 z-[2]',
              'h-[30%]',
              'bg-gradient-to-t from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
            )}
          /> */}
        </div>
      </section>


    </>
  )
}
