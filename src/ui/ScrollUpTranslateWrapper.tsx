import { cn } from '@/utils/cn';
import { useInView, useScroll, useTransform } from 'motion/react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react';
import { ScreenKeys } from '@/configs/screens';
import { useActualScreenWidth } from '@/utils/hooks/useActualScreenWidth';

type Props = {
  children: ReactNode;
  className?: string;
  inView?: {
    margin?: number
  },
  options: {
    distanse: string // base:60vh md:40vh xl:20vh
    scroll_gap: string // base:20vh md:30vh xl:40vh
  }
}
export function ScrollUpMarginWrapper(props: Props) {
  const actualScreenWidth = useActualScreenWidth()
  const wrapperRef = useRef(null)
  const [scrollYRange, setScrollYRange] = useState([0, 0]);
  const [marginYRange, setMarginYRange] = useState([0, 0]);
  const isInView = useInView(wrapperRef, { margin: `${props.inView?.margin ?? 50}px` })
  const { scrollY } = useScroll()
  const marginTop = useTransform(
    scrollY,
    scrollYRange,
    marginYRange,
  )

  const distanse = useMemo(() => {
    const s = props.options.distanse;

    // @ts-expect-error "_"
    const breakpoints: Record<ScreenKeys | 'base', number> = {}
    s.split(' ').forEach((key) => {
      const [screen, vh] = key.split(':')
      breakpoints[screen] = parseInt(vh);
    })

    return breakpoints
  }, [props.options.distanse])

  const scroll_gap = useMemo(() => {
    const scroll_gap = props.options.scroll_gap;

    // @ts-expect-error "_"
    const breakpoints: Record<ScreenKeys | 'base', number> = {}
    scroll_gap.split(' ').forEach((key) => {
      const [screen, vh] = key.split(':')
      breakpoints[screen] = parseInt(vh);
    })

    return breakpoints
  }, [props.options.scroll_gap])

  useEffect(() => {
    if (!isInView) return;

    // расчет scrollYRange
    const scrollY = window.scrollY;
    const screen_distanse = distanse[actualScreenWidth.screenKey] ?? distanse['base'];
    const scrollGap = +(((screen_distanse / 100) * window.innerHeight).toFixed());
    setScrollYRange([scrollY, scrollY + scrollGap])
  }, [isInView, distanse, actualScreenWidth.screenKey]);

  useEffect(() => {
    if (!isInView) return;

    // расчет marginYRange
    const screen_translateY_gap = scroll_gap[actualScreenWidth.screenKey] ?? scroll_gap['base'];
    const marginYRange = +(((screen_translateY_gap / 100) * window.innerHeight).toFixed());

    setMarginYRange([0, -marginYRange])
  }, [isInView, scroll_gap, actualScreenWidth.screenKey])

  return (
    <motion.div
      ref={wrapperRef}
      style={{ marginTop }}
      className={cn(
        props.className
      )}
    >
      {props.children}
    </motion.div>
  )
}