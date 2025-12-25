'use client';

import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { SVGProps, useEffect, useState } from 'react';
import { brone_table_config, PlacesModalNextSteps } from './config';
import { ImagesGallery } from '@/components/images_gallery/ImagesGallery';
import { AnimatedList } from '@/bits/AnimatedList';
import { BlurText } from '@/bits/BlurText';
import { SplitText } from '@/bits/SplitText';
import { AnimatedImage } from '@/bits/AnimatedImage';
import { RestaurantPlaceKeys } from '@/configs/places';



type Props = {
  nextStep?: PlacesModalNextSteps;
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  modalDesc?: string;
}

export function PlacesModal({
  isOpen,
  nextStep,
  onClose: onCloseProps,
  modalTitle,
  modalDesc,
}: Props) {
  const [activeMousePlaceKey, setActiveMousePlaceKey] = useState<null | RestaurantPlaceKeys>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<null | RestaurantPlaceKeys>(RestaurantPlaceKeys.RedOctober);

  function reset() {
    setActiveMousePlaceKey(null)
    setSelectedRestaurant(null)
  }

  function onClose() {
    reset()
    onCloseProps();
  }

  return (
    <AnimatePresence mode='popLayout'>
      {isOpen && (
        <section
          className={cn(
            'fixed inset-0 z-[1000]',
            'lg:flex lg:items-center lg:justify-center'
          )}
        >
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className='absolute inset-0 z-[2] cursor-pointer'
          />

          <motion.article
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'relative z-[4] overflow-hidden',
              'bg-custom-black-100 text-custom-white-100',
              'max-w-screen max-h-screen w-screen h-screen p-5',
              'md:p-0',
              'lg:w-[960px] lg:max-w-[960px] lg:h-[590px] lg:max-h-[590px] lg:rounded-[12px] lg:overflow-hidden',
              'xl:w-[1280px] xl:max-w-[1280px]',
              'xl:h-[630px] xl:max-h-[630px]',

            )}
          >
            <div>
              <div className={cn(
                'w-full h-min flex items-center justify-end',
                'md:pt-4 md:px-4',
                'xl:pt-5 xl:px-5'
              )}>
                <button
                  onClick={onClose}
                  className={cn(
                    'cursor-pointer',
                    'w-5 h-5 relative',
                  )}
                >
                  <div
                    className='w-[80%] h-px bg-custom-white-200 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-45'
                  />
                  <div
                    className='w-[80%] h-px bg-custom-white-200 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-45'
                  />
                </button>
              </div>

              <div className='mt-[32px] xl:mt-[50px] xl:gap-4 lg:gap-[15px] md:mt-[16px] flex flex-col gap-[20px] md:gap-3 text-center'>
                <h3
                  className={cn(
                    'text-[20px] leading-[24px] font-baskervville uppercase tracking-[6px]',
                    'md:text-[30px]',
                    'xl:text-[36px]'
                  )}
                >
                  <BlurText
                    text={modalTitle}
                    delay={800}
                    animateBy="words"
                    direction="bottom"
                    className='justify-center'
                  />
                </h3>

                <div
                  className='text-[12px] font-medium font-inter uppercase tracking-[1px] xl:tracking-[2px]'
                >
                  <BlurText
                    text={modalDesc}
                    delay={100}
                    animateBy="words"
                    direction="bottom"
                    className='justify-center'
                  />
                </div>
              </div>
            </div>

            <motion.article
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className={cn(
                'absolute inset-0 z-[2] bg-custom-black-100',
                'p-5 flex flex-col gap-[32px]',
                'md:p-0'
              )}
            >
              <div
                className={cn(
                  'w-full h-min flex items-center justify-between',
                  'md:absolute md:top-[14px] md:left-4 md:right-4 md:w-auto z-[5]',
                  'xl:top-5 xl:left-5 xl:right-5'
                )}
              >
                <div></div>

                <button
                  onClick={onClose}
                  className={cn(
                    'cursor-pointer transition-all',
                    'w-5 h-5 relative hover:opacity-80 hover:scale-90'
                  )}
                >
                  <div
                    className='w-[80%] h-0.5 bg-custom-white-200 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rotate-45'
                  />
                  <div
                    className='w-[80%] h-0.5 bg-custom-white-200 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -rotate-45'
                  />
                </button>
              </div>

              <div
                className={cn(
                  'grow flex items-center justify-center',
                )}
              >
                {nextStep === PlacesModalNextSteps.MAIN_MENU && (
                  <ImagesGallery
                    images={brone_table_config[PlacesModalNextSteps.MAIN_MENU].images}
                    loading='eager'
                    classNames={{
                      wrapperClassName: cn(
                        // 'bg-red-500',
                        'max-w-screen max-h-screen',
                        'w-full h-full'
                      ),
                      swiperClassName: cn(
                        // 'bg-blue-500',
                        'w-full h-full'
                      ),
                      slideClassName: cn(
                        // 'bg-green-500',
                        'max-w-full max-h-full mx-auto',
                        'lg:max-h-[590px]',
                        'xl:max-h-[600px]',
                      )
                    }}
                  />
                )}
              </div>
            </motion.article>
          </motion.article>
        </section>
      )}
    </AnimatePresence>
  )
}
