"use client";
import { AnimatedList } from '@/bits/AnimatedList';
import { StarBorder } from '@/bits/animations/StarBorder/StarBorder';
import { FadeContent } from '@/bits/FadeContent';
import { SplitText } from '@/bits/SplitText';
import { GoogleMap } from '@/components/google_map/GoogleMap';
import { BLOCKS_IDS_ENUM } from '@/components/header';
import { MapIcon } from '@/components/icons/MapIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { YandexMapIcon } from '@/components/icons/YandexMapIcon';
import { matryoshka } from '@/configs/matryoshka';
import { RestaurantPlaceKeys } from '@/configs/places';
import { cn } from '@/utils/cn';
import { useState } from 'react';

type MoscowDay = 'thursday' | 'friday' | 'saturday' | 'other';

export function getMoscowDay(): MoscowDay {
  const now = new Date();

  const utcTime = now.getTime() + now.getTimezoneOffset() * 60_000;
  const moscowTime = new Date(utcTime + 3 * 60 * 60 * 1000);

  const day = moscowTime.getDay();
  const hour = moscowTime.getHours();

  // чт 20:00-03:00
  const isThursday = day === 4 || (day === 5 && hour < 3);
  if (isThursday) {
    return 'thursday';
  }

  // пт 20:00-05:00
  const isFriday = (day === 5 && hour >= 3) || (day === 6 && hour < 5);
  if (isFriday) {
    return 'friday';
  }

  // сб 20:00-05:00
  const isSaturday = (day === 6 && hour >= 5) || (day === 0 && hour < 5);
  if (isSaturday) {
    return 'saturday';
  }

  return 'other';
}


const GoogleMapID = 'imc=[-ucbvy54v54-054ch54=c548';

type Props = {}
export function PlacesMap({ }: Props) {
  const [selectedMarker, setSelectedMarker] = useState<RestaurantPlaceKeys>(RestaurantPlaceKeys.RedOctober)

  function focusMarker(key: RestaurantPlaceKeys) {
    const mapElement = document.getElementById(GoogleMapID);
    if (mapElement) {
      mapElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    setSelectedMarker(key)
  }

  return (
    <section
      id={BLOCKS_IDS_ENUM.CONTACTS}
    >
      <article
        className={cn(
          'pt-[60px] md:pt-[100px]',
          '1_5xl:w-[1440px] 1_5xl:mx-auto'
        )}
      >
        <section
          className={cn(
            'relative',
            'flex flex-col gap-6 md:gap-10',
          )}
        >
          <FadeContent
            blur={true}
            delay={200}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
            className={cn(
              'mx-auto flex flex-col gap-2'
            )}
          >
            <h2
              className={cn(
                'font-jost uppercase text-center text-custom-white-101',
                'text-[18px] leading-[18px] tracking-[3px]',
                'md:text-[36px] md:leading-[40px] md:tracking-[6px]'
              )}
            >
              РАДЫ ГОСТЮ
            </h2>
            <p
              className={cn(
                'font-jost uppercase text-center text-custom-white-101',
                'text-[10px] leading-[10px] tracking-[1.25px]',
                'md:text-[16px] md:leading-[16px] md:tracking-[4.8px]'
              )}
            >
              с четверга по субботу
            </p>
          </FadeContent>

          <div
            className={cn(
              'flex flex-col gap-1.5 md:gap-3 md:tracking-[3px] md:uppercase',
              'text-[14px] leading-[16px]'
            )}
          >
            <a
              href={matryoshka.adress.href}
              target='_blank'
              className={cn(
                'flex items-center text-custom-white-101 whitespace-nowrap w-min mx-auto gap-2',
              )}
            >
              <YandexMapIcon className='w-3 h-3 md:hidden' />
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


        </section>

        <FadeContent
          blur={true}
          delay={200}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
          className={cn(
          )}
        >
          <section
            className={cn(
              'w-full h-[434px] mt-[30px]',
              'md:h-[550px] md:mt-[48px]',
              'lg:h-[733px] lg:mt-[60px]',
              '1_5xl:h-[820px]'
            )}
          >
            <GoogleMap
              GoogleMapID={GoogleMapID}
              selectedMarker={selectedMarker}
              onSelectMarker={(key) => {
                setSelectedMarker(key)
              }}
            />
          </section>
        </FadeContent>
      </article>
    </section>
  )
}

