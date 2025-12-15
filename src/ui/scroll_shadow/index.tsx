'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/utils/cn"; // если используешь utility для объединения классов
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  shadowSize?: number;
  shadowColor?: string;
  bottomShadowClassName?: string;
  topShadowClassName?: string;
};

export function ScrollShadow(props: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollExist, setScrollExist] = useState(
    (wrapperRef.current?.clientHeight || 0) > (wrapperRef.current?.clientHeight || 1)
  );
  const [atBottom, setAtBottom] = useState(false);
  const [atTop, setAtTop] = useState(false);

  // Проверяем, есть ли скролл
  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const calc = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const scrollExist = wrapper.scrollHeight > wrapper.clientHeight;
      setScrollExist(scrollExist)
    }
    calc();

    const mutationObserver = new MutationObserver(calc);
    mutationObserver.observe(wrapperRef.current, { childList: true, subtree: true })

    return () => mutationObserver.disconnect()
  }, [])


  // Отслеживаем позицию скролла снизу
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const isBottomScroll = Math.ceil(el.scrollTop) + el.clientHeight >= el.scrollHeight
      setAtBottom(
        isBottomScroll
      );
    };
    handleScroll()

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Отслеживаем позицию скролла сверху
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const isTopScroll = Math.ceil(el.scrollTop) <= 1;
      setAtTop(isTopScroll);
    };
    handleScroll()

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'relative',
        props.className,
        'h-[170px] max-h-[170px]',
      )}
    >
      <div
        ref={wrapperRef}
        className='w-full h-full relative z-[1] overflow-y-auto'
      >
        {props.children}
      </div>

      <AnimatePresence key='top shadow'>
        {(scrollExist && !atTop) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: `${props.shadowSize || 40}px`
            }}
            className={cn(
              'absolute z-[2] top-0 left-0 right-0',
              'bg-gradient-to-t from-transparent',
              props.topShadowClassName
            )}
          />
        )}
      </AnimatePresence>

      <AnimatePresence key='bottom shadow'>
        {(scrollExist && !atBottom) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              height: `${props.shadowSize || 40}px`
            }}
            className={cn(
              'absolute z-[2] bottom-0 left-0 right-0',
              'bg-gradient-to-b from-transparent',
              props.bottomShadowClassName
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
