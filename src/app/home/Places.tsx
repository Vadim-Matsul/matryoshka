'use client';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { ParkingIcon } from '@/components/icons/ParkingIcon'
import { VerandIcon } from '@/components/icons/VerandIcon'
import { PlaceSquareIcon } from '@/components/icons/PlaceSquareIcon'
import { Keyboard, Mousewheel, Pagination, Autoplay as AutoplaySwiper, EffectCoverflow } from 'swiper/modules';
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimatedImage } from '@/bits/AnimatedImage';
import { PlacesModalNextSteps } from '@/components/modals/places_modal/config';
import { BlurText } from '@/bits/BlurText';
import { SplitText } from '@/bits/SplitText';
import { AnimatedList } from '@/bits/AnimatedList';
import { matryoshka } from '@/configs/matryoshka';
import { BLOCKS_IDS_ENUM } from '@/components/header';

type Props = {}

export function Places({ }: Props) {

  return (
    <section
      id={BLOCKS_IDS_ENUM.ABOUT}
      className={cn(
        '1_5xl:w-[1440px] 1_5xl:mx-auto',
        'flex flex-col-reverse lg:flex-row lg:justify-between'
      )}
    >
      <div
        className={cn(
          'py-[40px] px-[20px] flex flex-col text-custom-white-101',
          'sm:py-[80px] lg:pl-[80px]',
          'lg:w-[540px] 1_5lg:w-[600px] lg:h-min lg:self-center'
        )}
      >
        <h2
          className={cn(
            'tracking-[3px] uppercase',
            'text-[22px] leading-[22px] mb-4 text-center lg:text-left',
            'md:text-[28px] md:leading-[28px] md:mb-3'
          )}
        >
          МАТРЁШКА
        </h2>

        <a
          href={matryoshka.adress.name}
          target='_blank'
          className={cn(
            'font-medium tracking-[3px] uppercase',
            'text-[12px] leading-[12px] text-center lg:text-left',
            'md:text-[14px] md:leading-[14px]'
          )}
        >
          {matryoshka.adress.name}
        </a>

        <div
          className={cn(
            'max-w-[320px] w-full mx-auto mt-8 ',
            'md:max-w-[520px] md:mt-10 lg:max-w-none'
          )}
        >
          <p
            className={cn(
              'text-[14px] leading-[17px] mb-8 text-left',
              'md:text-[18px] md:leading-[22px] md:mb-[80px]'
            )}
          >
            Караоке-бар с русским характером. Здесь каждый гость становится частью большой истории, в которой переплетаются российские корни и многогранность мирового музыкального наследия.
          </p>

          <div
            className={cn(
              'rounded-[30px] overflow-hidden ',
              'hover:scale-[.95] focus:scale-[.95] transition-all',
              'w-[190px] mx-auto lg:mx-0',
              'md:w-[206px] '
            )}
          >
            <StarBorder
              as="a"
              href={matryoshka.phone.href}
              speed="3s"
              thickness={1.5}
              className={cn(
                'cursor-pointer pb-0.5'
              )}
            >
              <div
                className={cn(
                  // 'bg-[linear-gradient(180deg,#B30122_0%,#FFFFFF_0%,#FF1919_80%)]',
                  'bg-[linear-gradient(45deg,#B30122_0%,#ffffff40_60%,#B30122_100%)] ',
                  'relative inline-flex rounded-[30px] p-[1px]',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.30)]',
                  'w-full',
                  cn(
                    'h-[42px]',
                    'md:h-[50px]'
                  )
                )}
              >
                <div
                  className={cn(
                    'w-full h-full rounded-[30px] bg-custom-black-100',
                    'flex items-center justify-center'
                  )}
                >
                  <span
                    className={cn(
                      'text-[14px] leading-[14px] tracking-[0.5px] text-custom-white-102',
                      'md:text-[18px] md:leading-[18px] md:tracking-[0px]'
                    )}
                  >
                    {matryoshka.phone.str}
                  </span>
                </div>
              </div>
            </StarBorder>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'h-[630px] md:h-[730px] lg:h-[970px] relative overflow-hidden',
          'lg:w-[500px] xl:w-[640px] 1_5xl:w-[720px]'
        )}
      >
        <picture
          className='w-full h-full'
        >

          <AnimatedImage
            src='/images/dark_matryoshka.webp'
            alt=''
            options={{
              blur: 20,
              scale: 1.3,
              delay: 0,
              duration: 1.5,
            }}
            className={cn(
              'w-full h-full object-cover relative z-[1] select-none',
            )}
          />

        </picture>

        <div
          className={cn(
            'absolute left-0 top-0 right-0 z-[2]',
            'h-[20%]',
            'bg-gradient-to-t from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
          )}
        />
        <div
          className={cn(
            'absolute  left-0 bottom-0 right-0 z-[2]',
            'h-[20%]',
            'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
          )}
        />
      </div>
    </section>
  )
}


