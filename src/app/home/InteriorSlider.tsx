
import { AnimatedImage } from '@/bits/AnimatedImage';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { EffectCoverflow, Keyboard, Mousewheel, Pagination, Autoplay as AutoplaySwiper } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const conf = {
  images: {
    mobileMaxPX: 440,
    mobile: [
      { src: '/images/place_mobile_1.webp', alt: 'Главный зал караоке-бара Матрёшка в Москве' },
      { src: '/images/place_mobile_4.webp', alt: 'VIP-зал с банкетным столом в Матрёшке' },
      { src: '/images/place_mobile_3.webp', alt: 'Сцена для живых выступлений и караоке в Матрёшке' },
      { src: '/images/place_mobile_2.webp', alt: 'Барная стойка с авторским декором в Матрёшке' },
      { src: '/images/place_mobile_5.webp', alt: 'Большой зал Матрёшки — панорама с экранами для караоке' },
    ],
    desktop: [
      { src: '/images/place_desktop_1.webp', alt: 'Главный зал караоке-бара Матрёшка в Москве' },
      { src: '/images/place_desktop_2.webp', alt: 'Барная стойка с авторским декором в Матрёшке' },
      { src: '/images/place_desktop_3.webp', alt: 'Сцена для живых выступлений и караоке в Матрёшке' },
      { src: '/images/place_desktop_4.webp', alt: 'VIP-зал с банкетным столом в Матрёшке' },
      { src: '/images/place_desktop_5.webp', alt: 'Большой зал Матрёшки — панорама с экранами для караоке' },
      { src: '/images/place_desktop_6.webp', alt: 'Приватный зал для мероприятий в Матрёшке' },
    ]
  }
}

export function InteriorSlider() {

  const swiperRef = useRef<any>(null);

  const [images, setImages] = useState(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= conf.images.mobileMaxPX;
    return isDesktop ? conf.images.desktop : conf.images.mobile;
  })

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function onResize() {
      const isDesktop = window.innerWidth >= conf.images.mobileMaxPX;
      setImages(isDesktop ? conf.images.desktop : conf.images.mobile as typeof conf.images.desktop)
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    }
  }, [])

  return (
    <section
      className='1_5xl:mx-auto 1_5xl:max-w-360'
    >
      <div className='h-[655px] md:h-[955px] rounded-t-2xl overflow-hidden relative'>
        <Swiper
          modules={[Pagination, Mousewheel, Keyboard, AutoplaySwiper, EffectCoverflow]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          pagination={{
            clickable: true,
          }}
          mousewheel={{ forceToAxis: true }}
          keyboard={{ enabled: true }}
          spaceBetween={16}
          slidesPerView={1}
          loop={images.length > 3}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="coverflow"
          grabCursor
          centeredSlides
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}

          className={cn(
            'h-full overflow-hidden relative'
          )}
        >
          {images.map((img, idx) => {
            return (
              <SwiperSlide
                key={idx}
                className={cn(
                  'relative'
                )}
              >
                <div
                  className='w-full h-full absolute inset-0 z-[2]'
                >
                  <AnimatedImage
                    src={img.src}
                    alt={img.alt}
                    options={{
                      blur: 20,
                      scale: 1,
                      delay: 0,
                      duration: 1.5,
                    }}
                    className={cn(
                      'w-full h-full object-cover'
                    )}
                  />

                  <div
                    className={cn(
                      'via-40% via-custom-black-100/70 absolute left-0 right-0 top-0 bg-gradient-to-b from-custom-black-100 to-transparent',
                      'h-[20%]'
                    )}
                  />
                  <div
                    className={cn(
                      'via-50% via-custom-black-100/90 absolute left-0 right-0 bottom-0 bg-gradient-to-t from-custom-black-100 to-transparent',
                      'h-[20%]'
                    )}
                  />
                  <div
                    className={cn(
                      'via-40% via-custom-black-100/70 absolute left-0 bottom-0 top-0 bg-gradient-to-r from-custom-black-100 to-transparent',
                      'w-[10%]'
                    )}
                  />
                  <div
                    className={cn(
                      'via-40% via-custom-black-100/90 absolute top-0 right-0 bottom-0 bg-gradient-to-l from-custom-black-100 to-transparent',
                      'w-[10%]'
                    )}
                  />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}
