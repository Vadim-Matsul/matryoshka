import { AnimatedImage } from '@/bits/AnimatedImage'
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder'
import { BlurText } from '@/bits/BlurText'
import { FadeContent } from '@/bits/FadeContent'
import { SplitText } from '@/bits/SplitText'
import { YandexMapIcon } from '@/components/icons/YandexMapIcon'
import { PlacesModalNextSteps } from '@/components/modals/places_modal/config'
import { matryoshka } from '@/configs/matryoshka'
import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'
import { getMoscowDay } from './PlacesMap'
import introstyles from './intro.module.css'

type Props = {}

export function Intro({ }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateSource = () => {
      const isMobile = window.innerWidth < 768;
      const newSrc = isMobile
        ? '/videos/intro_mobile.mp4?v=2'
        : '/videos/intro_desktop.mp4?v=2';

      const source = video.querySelector('source');
      if (source && source.getAttribute('src') !== newSrc) {
        source.setAttribute('src', newSrc);
        video.load();
      }
    };

    updateSource();
    window.addEventListener('resize', updateSource);
    return () => window.removeEventListener('resize', updateSource);
  }, []);

  return (
    <>
      <h1 className="sr-only">Матрёшка — авторский ресторан-бар в Москве на Болотной набережной</h1>
      <section
        className={cn(
          'relative',
          'w-full rounded-b-2xl overflow-hidden',
          introstyles.wrapper_mediaqueries
        )}
      >
        <div
          className={cn(
            '1_5xl:w-[1440px] 1_5xl:mx-auto bg-transparent',
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
                Сегодня до 06:00
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
            'absolute inset-0 z-[1] overflow-hidden ',
            '1_5xl:w-[1440px] 1_5xl:mx-auto rounded-b-2xl overflow-hidden',
            ''
          )}
        >
          <div className='w-full aspect-[9/16] md:aspect-[1920/1080]'>
            <video
              ref={videoRef}
              autoPlay
              loop
              controls={false}
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
              className="w-full h-full bg-video object-cover"
            >
              <source src="/videos/intro_desktop.mp4?v=2" type="video/mp4" />
            </video>
          </div>

        </div>
      </section>


    </>
  )
}
