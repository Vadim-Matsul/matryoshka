"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./gallery.css";

// lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { cn } from '@/utils/cn';

type Props = {
  images: string[];
  classNames?: {
    wrapperClassName?: string;
    swiperClassName?: string;
    slideClassName?: string;
  }
};

export function ImagesGallery({ images, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div
      className={cn(
        "relative w-full",
        props.classNames?.wrapperClassName
      )}
    >
      {/* Основная карусель */}
      <Swiper
        modules={[Pagination, Mousewheel, Keyboard]}
        pagination={{ clickable: true }}
        mousewheel={{ forceToAxis: true }}
        keyboard={{ enabled: true }}
        spaceBetween={16}
        slidesPerView={1}
        className={cn(
          props.classNames?.swiperClassName
        )}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              onClick={() => {
                setIndex(idx);
                setOpen(true);
              }}
              alt={`image-${idx}`}
              draggable={false}
              loading='lazy'
              decoding='async'
              className={cn(
                'select-none cursor-zoom-in',
                props.classNames?.slideClassName,
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox с zoom и каруселью */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img }))}
        plugins={[Zoom]}
        controller={{
          disableSwipeNavigation: images.length <= 1
        }}
        animation={{
          fade: 300,
          swipe: 500,
          easing: {
            fade: "cubic-bezier(0.4, 0, 0.2, 1)",
            swipe: "cubic-bezier(0.22, 1, 0.36, 1)"
          }
        }}
      />
    </div>
  );
}
