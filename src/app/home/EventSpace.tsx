'use client';

import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { BLOCKS_IDS_ENUM } from '@/components/header';
import { cn } from '@/utils/cn';

const config = {
  description: `Ваш праздник, ваши правила. Арендуйте локации Дымзавода для проведения мероприятий любого масштаба — от камерных встреч до торжественных приёмов. Мы позаботимся обо всём, что нужно для безупречного события`,
} as const;

type Props = {}

export function EventSpace({ }: Props) {

  function scrollToBrone() {
    function scroll() {
      const el = document.getElementById(BLOCKS_IDS_ENUM.BRONE);
      if (!el) return;


      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    scroll()
  }

  return (
    <section
      className={cn(
        'relative h-[750px] md:h-[1100px]',
        'py-[60px] px-[24px] flex flex-col justify-between',
        'md:pt-[90px] md:pb-[40px]',
        '1_5xl:max-w-[1440px] 1_5xl:mx-auto'
      )}
    >
      <h2
        className={cn(
          'relative z-[2]',
          'font-jost uppercase tracking-[3px] text-center',
          'text-[18px] leading-[20px]',
          'md:text-[36px] md:leading-[40px]',
        )}
      >
        Пространство, <br />где важное звучит иначе
      </h2>

      <div
        className={cn(
          'relative z-[2]',
          'rounded-[30px] overflow-hidden ',
          'hover:scale-[.95] focus:scale-[.95] transition-all',
          'w-[220px] md:w-[260px] mx-auto'
        )}
      >
        <StarBorder
          as="button"
          onClick={scrollToBrone}
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
                'h-[40px]',
                'md:h-[48px]',
              )
            )}
          >
            <div
              className={cn(
                'w-full h-full rounded-[30px] bg-custom-black-100',
                'flex items-center justify-center text-custom-white-102',
                'md:text-[18px] md:leading-[18px]'
              )}
            >
              <p>
                Организовать событие
              </p>
            </div>
          </div>
        </StarBorder>
      </div>

      <div
        className={cn(
          'absolute left-0 top-0 right-0 h-[630px] md:h-[1100px] z-[1]'
        )}
      >
        <img
          loading='lazy'
          decoding='async'
          src='/images/girl_desktop.webp'
          alt='Девушка поёт в микрофон'
          className='hidden lg:block w-full h-full object-cover select-none'
        />

        <img
          loading='lazy'
          decoding='async'
          src='/images/girl_mobile.webp'
          alt='Девушка поёт в микрофон'
          className='lg:hidden w-full h-full object-cover select-none'
        />


        <div
          className={cn(
            'absolute left-0 top-0 right-0 z-[2]',
            'h-[20%] md:h-[35%]',
            'bg-gradient-to-t from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
          )}
        />

        <div
          className={cn(
            'absolute left-0 bottom-0 right-0 z-[2]',
            'h-[20%] md:h-[35%]',
            'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
          )}
        />
      </div>

    </section>
  )
}
