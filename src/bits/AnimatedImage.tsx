'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/utils/cn'

type AnimatedImageOptions = {
  /** in sec */
  delay?: number
  /** in sec */
  duration?: number
  blur?: number
  scale?: number
}

type AnimatedImageProps = {
  src: string
  alt: string
  className?: string
  options?: AnimatedImageOptions
}

export function AnimatedImage({
  src,
  alt,
  className,
  options = {},
}: AnimatedImageProps) {
  const { delay = 0, duration = 1.2, blur = 12, scale = 1.1 } = options

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      initial={{ filter: `blur(${blur}px)`, scale }}
      animate={isInView ? { filter: 'blur(0px)', scale: 1 } : {}}
      transition={{
        delay,
        duration,
        ease: 'easeOut',
      }}
      draggable={false}
      loading="lazy"
      decoding="async"
      className={cn('select-none', className)}
    />
  )
}
