'use client';

import { cn } from '@/utils/cn';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { motion, AnimatePresence } from 'motion/react';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { LiquidGlass } from '@/ui/LiquidGlass';
import { LogoIcon } from '../icons/LogoIcon';
import { PlacesModalNextSteps } from '../modals/places_modal/config';
import { FadeContent } from '@/bits/FadeContent';
import { AnimatedContent } from '@/bits/AnimatedContent';
import { AnimatedList } from '@/bits/AnimatedList';
import { usePathname, useRouter } from 'next/navigation';

// const includeBlocks = [
//   RestaurantPlaceKeys.Vernadsky,
//   RestaurantPlaceKeys.Rassvet,
//   RestaurantPlaceKeys.RedOctober,
//   RestaurantPlaceKeys.Khamovniki,
//   RestaurantPlaceKeys.Sochi,
// ];

// const pageLinksArr = restaurantPlaces.filter(place => includeBlocks.includes(place.key));

export enum BLOCKS_IDS_ENUM {
  ABOUT = 'a',
  CONTACTS = 'c',
  MENU = 'm',
  BRONE = 'b'
}

export const anchors = [
  {
    id: BLOCKS_IDS_ENUM.ABOUT,
    title: 'О МАТРЕШКЕ'
  },
  {
    id: BLOCKS_IDS_ENUM.CONTACTS,
    title: 'Как нас найти'
  },
  {
    id: BLOCKS_IDS_ENUM.MENU,
    title: 'Кушанья и питьё'
  }
]

type Props = {}
export function Header({ }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBroneModal,
    setIsOpenBroneModal] = useState(false)

  useEffect(() => {
    /** эффект скрывает-показывает хедер */
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      const scrollGap = window.innerWidth >= 768
        ? 88
        : 52;

      if (currentScroll > lastScroll && currentScroll > scrollGap) {
        // скролл вниз → прячем
        setHidden(true);
      } else if (currentScroll < lastScroll) {
        // скролл вверх → показываем
        setHidden(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  useLayoutEffect(() => {
    /**
     * Эффект следит за закрытием Drawer
     * при экране > lg
     */
    const xlLG_SCREEN_PX = 1180;

    const recalculate = () => {
      if (!isOpen) return;
      const is1180Width = window.innerWidth >= xlLG_SCREEN_PX;
      setIsOpen(!is1180Width)
    }

    const resizeObserver = new ResizeObserver(recalculate)
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, [isOpen])


  function scrollToBlock(id: BLOCKS_IDS_ENUM) {
    function scroll() {
      const el = document.getElementById(id);
      if (!el) return;

      setIsOpen(false);

      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    const isHome = pathname.trim() === '/'
    if (isHome) {
      scroll()
      return
    } else if (!isHome) {
      setIsOpen(false)
      router.push('/')
      setTimeout(scroll, 2000)
    }
  }


  return (
    <>
      <header
        className={cn(
          'h-[40px] md:h-[70px] overflow-hidden',
          'bg-custom-black-100 rounded-b-2xl',
          // 'bg-gradient-to-b from-custom-black-100 via-[70%] via-custom-black-100 to-transparent',
          "fixed top-0 left-0 right-0 z-50",
          'w-full transition-transform duration-300',
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div
          className={cn(
            'w-full h-full flex',
            'px-4 md:px-[30px]',
            '1_5xl:w-[1440px] 1_5xl:mx-auto'
          )}
        >
          <div
            className={cn(
              '1_5lg:w-0 1_5lg:h-0 1_5lg:opacity-0 1_5lg:overflow-hidden 1_5lg:p-0 1_5lg:m-0',
              'relative',
              'w-full h-full flex grow items-center justify-center',
            )}
          >
            <FadeContent
              blur={true}
              duration={1000}
              easing="ease-out"
              initialOpacity={0}
            >
              <LogoIcon
                id='c0-93580g5f30nv9n954'
                className='w-[110px] h-[18px] md:w-[180px] md:h-[28px]'
              />
            </FadeContent>

            <AnimatedContent
              ease="power3.out"
              direction="horizontal"
              delay={0.5}
              className='absolute top-1/2 -translate-y-1/2 right-0 w-[32px] h-[32px]'
            >
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                className='cursor-pointer w-full h-full flex items-center justify-center'
              >
                <div
                  className='w-[22px] h-[16px] relative'
                >
                  <div
                    className={cn(
                      'rounded-full transition-all duration-300',
                      'h-[2.8px] bg-custom-white-100',
                      'absolute top-0 right-0',
                      isOpen ? 'left-[12px]' : 'left-0'
                    )}
                  />

                  <div
                    className={cn(
                      'rounded-full transition-all duration-300',
                      'h-[2.8px] bg-custom-white-100',
                      'absolute top-1/2 -translate-y-1/2 right-0',
                      isOpen ? 'left-[8px]' : 'left-0'
                    )}
                  />

                  <div
                    className={cn(
                      'rounded-full transition-all duration-300',
                      'h-[2.8px] bg-custom-white-100',
                      'absolute bottom-0 right-0',
                      isOpen ? 'left-[4px]' : 'left-0'
                    )}
                  />
                </div>
              </button>
            </AnimatedContent>
          </div>

          <div
            className={cn(
              'w-0 h-0 opacity-0 overflow-hidden p-0 m-0 absolute -translate-y-full',
              '1_5lg:w-full 1_5lg:h-full 1_5lg:opacity-100 1_5lg:overflow-auto 1_5lg:relative 1_5lg:translate-y-0',
              'hidden lg:flex',
              'items-center justify-between',
            )}
          >
            <div className=''>
              <FadeContent
                blur={true}
                duration={1000}
                easing="ease-out"
                initialOpacity={0}
              >
                <LogoIcon
                  id='cm=4cui5nv9n954'
                  className='w-[168px] h-[30px]'
                />
              </FadeContent>
            </div>

            <AnimatedList
              className={cn('flex items-center overflow-y-hidden', 'gap-[60px]')}
              stagger={0.4}
              delay={0.5}
            >
              {anchors.map(anchor => {

                return (
                  <button
                    key={anchor.id}
                    onClick={() => scrollToBlock(anchor.id)}
                    className={cn(
                      'py-4 cursor-pointer',
                      'inline-block',
                      'hover:opacity-80 focus:opacity-80',
                      'transition-all duration-300',
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs font-medium font-jost uppercase leading-none',
                        'tracking-[2px] 1_5xl:tracking-[3px]'
                      )}
                    >
                      {anchor.title}
                    </span>
                  </button>
                )
              })}
            </AnimatedList>

            <FadeContent
              blur={true}
              duration={1000}
              easing="ease-out"
              initialOpacity={0}
            >
              <div
                className={cn(
                  'rounded-[30px] overflow-hidden ',
                  'hover:scale-[.95] focus:scale-[.95] transition-all',
                  'w-[200px]'
                )}
              >
                <StarBorder
                  as="button"
                  onClick={() => scrollToBlock(BLOCKS_IDS_ENUM.BRONE)}
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
                        'h-[48px]',
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
                        Забронировать
                      </p>
                    </div>
                  </div>
                </StarBorder>
              </div>
            </FadeContent>
          </div>
        </div>
      </header>

      <Drawer.Root
        aria-describedby='навигация'
        direction='right'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disablePreventScroll
      >
        <Drawer.Overlay
          aria-describedby='навигация'
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-[20] bg-custom-black-100/5 backdrop-blur-[5px]'
        >
          <div
            className='w-[20vw] z-[2] fixed top-0 bottom-0 right-0 bg-custom-black-100 translate-x-[20px]'
          />
        </Drawer.Overlay>
        <Drawer.Title
          aria-describedby='навигация'
        />

        <Drawer.Portal
          aria-describedby='навигация'
        >
          <Drawer.Content
            aria-describedby='навигация'
            className={cn(
              'top-[40px] md:top-[70px]',
              'bg-custom-black-100',
              'fixed z-[51] rounded-l-[10px] bottom-0 right-0',
              // 'shadow-white shadow-lg',
              'w-[80vw] sm:max-w-[400px]',
              'max-h-[calc(100vh-52px)] md:max-h-[calc(100vh-70px)]',
              'overflow-y-auto overflow-x-hidden',
              'flex flex-col justify-between pt-[30px] pb-[60px]'
            )}
          >
            <div
              className={cn(
                'h-full flex flex-col justify-between',
              )}
            >
              <div
                className='flex flex-col gap-6 pl-5'
              >
                <AnimatedList
                  className={cn('flex flex-col items-center overflow-y-hidden', 'gap-[20px]')}
                  stagger={0.2}
                  delay={0.3}
                >
                  {anchors.map(anchor => {

                    return (
                      <button
                        key={anchor.id}
                        onClick={() => scrollToBlock(anchor.id)}
                        className={cn(
                          'py-4 cursor-pointer',
                          'inline-block',
                          'hover:opacity-80 focus:opacity-80',
                          'transition-all duration-300',
                        )}
                      >
                        <span
                          className={cn(
                            'text-[20px] font-medium font-jost uppercase leading-none',
                            'tracking-[2px] 1_5xl:tracking-[3px]'
                          )}
                        >
                          {anchor.title}
                        </span>
                      </button>
                    )
                  })}
                </AnimatedList>
              </div>

              <div className={cn(
                'w-full px-5 mt-8',
                'flex flex-col gap-6'
              )}>
                <div
                  className={cn(
                    'rounded-[30px] overflow-hidden ',
                    'hover:scale-[.95] focus:scale-[.95] transition-all',
                    'w-full'
                  )}
                >
                  <StarBorder
                    as="button"
                    onClick={() => scrollToBlock(BLOCKS_IDS_ENUM.BRONE)}
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
                          'h-[48px]',
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
                          Забронировать
                        </p>
                      </div>
                    </div>
                  </StarBorder>
                </div>
              </div>
            </div>

            <div>
              {/* contacts */}
              {/* map */}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}
