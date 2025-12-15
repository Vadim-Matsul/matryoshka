'use client'

import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type AnimatedListProps = {
  children: ReactNode[]
  stagger?: number
  delay?: number
  duration?: number
  className?: string
  li?: {
    className?: string
  }
  id?: string
  as?: keyof React.JSX.IntrinsicElements
}

export function AnimatedList({
  children,
  stagger = 0.15,
  delay = 0,
  duration = 0.5,
  className,
  id,
  li
}: AnimatedListProps) {
  return (
    <ul className={className} id={id}>
      {children &&
        children.map((child, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: delay + i * stagger,
              duration,
              ease: 'easeOut',
            }}
            className={cn(
              li?.className,
            )}
          >
            {child}
          </motion.li>
        ))}
    </ul>
  )
}
