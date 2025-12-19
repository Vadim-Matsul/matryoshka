import { AnimatedImage } from '@/bits/AnimatedImage'
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder'
import { BlurText } from '@/bits/BlurText'
import { FadeContent } from '@/bits/FadeContent'
import { SplitText } from '@/bits/SplitText'
import { PlacesModalNextSteps } from '@/components/modals/places_modal/config'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'


type Props = {}

export function Intro({ }: Props) {
  const [isOpenBroneModal, setIsOpenBroneModal] = useState(false)

  return (
    <>
      <section
        className={cn(
          'relative',
          'h-[700px] sm:h-[850px] md:h-[1150px] 1_5lg:h-[1345px]',
          'w-full',
        )}
      >
        <div
          className={cn(
            '1_5xl:w-[1440px] 1_5xl:mx-auto',
            'w-full h-full relative z-[2]',
            'flex justify-end flex-col',
          )}
        >
          <section
            className={cn(
              'flex items-center justify-between',
              'pb-[30px] px-[16px] md:pb-[80px] md:px-[80px]',
              'uppercase',
              cn(
                'uppercase font-medium',
                'text-[8px] leading-[10px] tracking-[2px]',
                'sm:text-[18px] sm:leading-[20px] sm:tracking-[3px] '
              )
            )}
          >
            <p>MOSCOW</p>
            <p className='text-center'>караоке-бар</p>
            <p>{new Date().getFullYear()}</p>
          </section>

          {/* <FadeContent
            blur={true}
            delay={4000}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
          >
            <div
              className={cn(
                'mx-auto',
                'rounded-[30px] overflow-hidden ',
                'hover:scale-[.95] focus:scale-[.95] transition-all',
                'w-[190px] h-[42px]',
                'lg:w-[200px] lg:h-[48px]  1_5xl:hidden'
              )}
            >
              <StarBorder
                as="button"
                onClick={() => setIsOpenBroneModal(true)}
                speed="3s"
                thickness={1.5}
                className={cn(
                  'cursor-pointer pb-0.5'
                )}
              >
                <div
                  className={cn(
                    'relative inline-flex rounded-[30px] p-[1px]',
                    'bg-[radial-gradient(240px_120px_at_95%_8%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.18)_38%,transparent_70%),radial-gradient(520px_220px_at_50%_100%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.20)_45%,transparent_80%),linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.10)_45%,rgba(255,255,255,0.06)_100%)]',
                    'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.30)]',
                    'w-full h-full'
                  )}
                >
                  <div
                    className={cn(
                      'w-full h-full rounded-[30px] bg-custom-black-100',
                      'flex items-center justify-center'
                    )}
                  >
                    <span className="text-custom-white-100 font-semibold font-jost leading-tight">
                      Забронировать
                    </span>
                  </div>
                </div>
              </StarBorder>
            </div>
          </FadeContent> */}
        </div>

        <div
          className={cn(
            'absolute inset-0 z-[1] overflow-hidden',
            '1_5xl:w-[1440px] 1_5xl:mx-auto rounded-b-2xl overflow-hidden'
          )}
        >
          <picture
            className='w-full h-full'
          >

            <AnimatedImage
              src='/images/intro.webp'
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
