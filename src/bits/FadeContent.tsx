import { ReactNode, useEffect, useRef, useCallback, memo, useState } from "react";

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const defaultDuration = 1000;
const defaultEasing = "ease-out";
const defaultThreshold = 0.1;
const defaultInitialOpacity = 0;

export const FadeContent = memo(function FadeContent({
  children,
  blur = false,
  duration = defaultDuration,
  easing = defaultEasing,
  delay = 0,
  threshold = defaultThreshold,
  initialOpacity = defaultInitialOpacity,
  className = "",
}: FadeContentProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Мемоизация callback'а для observer'а
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        timeoutRef.current = setTimeout(() => {
          setInView(true);
        }, delay);
      }
    },
    [delay]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersect, { threshold });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, handleIntersect]);

  // Стиль вычисляется только на основании двух зависимостей
  const style = {
    opacity: inView ? 1 : initialOpacity,
    transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
    filter: blur ? (inView ? "blur(0px)" : "blur(10px)") : "none",
  } as const;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
});
