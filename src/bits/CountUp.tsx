import {
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"; // или motion/react
import React, { useRef, useEffect, memo, useMemo, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number; // seconds
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export const CountUp = memo(function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = useMemo(() => 20 + 40 * (1 / duration), [duration]);
  const stiffness = useMemo(() => 100 * (1 / duration), [duration]);
  const springValue = useSpring(motionValue, { damping, stiffness });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [isStarted, setIsStarted] = useState(false);

  // Мемоизированный number formatter: отключаем useGrouping если separator пустой
  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        useGrouping: !!separator,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    [separator]
  );

  // Очищаем и скрываем до старта
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = "";
    }
    setIsStarted(false);
  }, [from, to, direction]);

  // Запуск анимации строго после delay
  useEffect(() => {
    if (isInView && startWhen) {
      if (onStart) onStart();

      const t1 = setTimeout(() => {
        setIsStarted(true);
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
      timers.current.push(t1);

      const t2 = setTimeout(() => {
        if (onEnd) onEnd();
      }, delay * 1000 + duration * 1000);
      timers.current.push(t2);

      return () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
      };
    }
  }, [
    isInView,
    startWhen,
    direction,
    from,
    to,
    delay,
    duration,
    onStart,
    onEnd,
    motionValue,
  ]);

  // Обновляем DOM по значению springValue
  useEffect(() => {
    if (!isStarted) return;
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        let formatted = numberFormatter.format(Number(latest.toFixed(0)));
        if (separator) {
          formatted = formatted.replace(/,/g, separator);
        }
        ref.current.textContent = formatted;
      }
    });
    return () => unsubscribe();
  }, [springValue, numberFormatter, separator, isStarted]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        opacity: isStarted ? 1 : 0,
        transition: "opacity 0.25s cubic-bezier(.4,0,.2,1)",
        display: "inline-block",
      }}
    />
  );
});
