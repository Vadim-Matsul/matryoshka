import { AnimatedList } from '@/bits/AnimatedList';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { BlurText } from '@/bits/BlurText';
import { BLOCKS_IDS_ENUM } from '@/components/header';
import { PlacesModalNextSteps } from '@/components/modals/places_modal/config';
import { PlacesModal } from '@/components/modals/places_modal/PlacesModal';
import { cn } from '@/utils/cn';
import { useState } from 'react';


export function FoodGallery() {
  const [activeModal, setActiveModal] = useState<PlacesModalNextSteps | undefined>()

  const openMainMenu = () => {
    setActiveModal(PlacesModalNextSteps.MAIN_MENU)
  }

  const openBar = () => {
    setActiveModal(PlacesModalNextSteps.BAR_MENU)
  }

  const openDym = () => {
    setActiveModal(PlacesModalNextSteps.DYM)
  }

  const isOpenBroneTableModal = activeModal !== undefined;

  return (
    <>
      <section
        id={BLOCKS_IDS_ENUM.MENU}
        className={cn(
          '1_5xl:w-[1440px] 1_5xl:mx-auto',
        )}
      >
        <section
          className={cn(
            'md:hidden',
          )}
        >
          <div
            className={cn(
              'h-[630px] w-full bg-red-500',
              'relative'
            )}
          >
            <video
              src='/videos/drinks.mp4'
              autoPlay
              loop
              muted
              className='w-full h-full object-cover relative z-[2]'
            />

            <div
              className={cn(
                'absolute left-0 top-0 right-0 z-[2]',
                'h-[20%]',
                'bg-gradient-to-t from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
              )}
            />

            <div
              className={cn(
                'absolute left-0 bottom-0 right-0 z-[2]',
                'h-[20%]',
                'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
              )}
            />
          </div>

          <div
            className={cn(
              'pt-[30px] pb-[52px]',
              'text-custom-white-101'
            )}
          >
            <h2
              className={cn(
                'text-[21px] leading-[21px] tracking-[3px] mb-4 uppercase text-center'
              )}
            >
              <BlurText
                text={'Галерея блюд'}
                delay={400}
                animateBy="words"
                direction="bottom"
                className='justify-center'
              />
            </h2>

            <p
              className={cn(
                'text-[12px] leading-[12px] font-medium tracking-[3px] uppercase text-center'
              )}
            >
              <BlurText
                text={'Авторской кухни'}
                delay={400}
                animateBy="words"
                direction="bottom"
                className='justify-center'
              />
            </p>

            <div
              className={cn(
                'mt-[50px]',
                'w-min mx-auto'
              )}
            >
              <div
                className={cn(
                  'rounded-[30px] overflow-hidden ',
                  'hover:scale-[.95] focus:scale-[.95] transition-all',
                  'w-[170px]'
                )}
              >
                <StarBorder
                  as="button"
                  onClick={openMainMenu}
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
                      )
                    )}
                  >
                    <div
                      className={cn(
                        'w-full h-full rounded-[30px] bg-custom-black-100',
                        'flex items-center justify-center'
                      )}
                    >
                      <p className='tracking-[2px] font-semibold'>
                        МЕНЮ
                      </p>
                    </div>
                  </div>
                </StarBorder>
              </div>
            </div>
          </div>
        </section>
        <section
          className={cn(
            'hidden md:flex',
            'h-[1000px] 1_5xl:h-[1240px] relative'
          )}
        >
          <div className='relative z-[2] pt-[80px] pb-[100px] grow flex flex-col justify-between'>
            <div>
              <h2
                className={cn(
                  'text-[36px] leading-[36px] tracking-[6px] mb-3 uppercase text-center'
                )}
              >
                <BlurText
                  text={'Галерея блюд'}
                  delay={400}
                  animateBy="words"
                  direction="bottom"
                  className='justify-center'
                />
              </h2>

              <p
                className={cn(
                  'text-[14px] leading-[14px] font-medium tracking-[3px] uppercase text-center'
                )}
              >
                <BlurText
                  text={'Авторской кухни'}
                  delay={400}
                  animateBy="words"
                  direction="bottom"
                  className='justify-center'
                />
              </p>
            </div>


            <div
              className={cn(
                'flex justify-center',
              )}
            >
              <div
                className={cn(
                  'rounded-[30px] overflow-hidden ',
                  'hover:scale-[.95] focus:scale-[.95] transition-all',
                  'w-[170px]'
                )}
              >
                <StarBorder
                  as="button"
                  onClick={openMainMenu}
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
                        'tracking-[2px] font-semibold',
                        'w-full h-full rounded-[30px] bg-custom-black-100',
                        'flex items-center justify-center'
                      )}
                    >
                      <p>
                        МЕНЮ
                      </p>
                    </div>
                  </div>
                </StarBorder>
              </div>
            </div>
          </div>

          <div
            className='absolute inset-0 z-[1]'
          >
            <video
              src='/videos/drinks.mp4'
              autoPlay
              loop
              muted
              className='w-full h-full object-cover relative z-[2]'
            />

            <div
              className={cn(
                'absolute left-0 top-0 right-0 z-[2]',
                'h-[40%]',
                'bg-gradient-to-t from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
              )}
            />

            <div
              className={cn(
                'absolute left-0 right-0 bottom-0 z-[2]',
                'h-[40%] sm:h-[50%] lg:h-[45%] 1_5xl:h-[60%]',
                'bg-gradient-to-b from-transparent via-custom-black-100/40 via-45% to-custom-black-100'
              )}
            />
          </div>
        </section>
      </section>

      <PlacesModal
        isOpen={isOpenBroneTableModal}
        onClose={() => setActiveModal(undefined)}
        nextStep={activeModal}
      />
    </>
  )
}