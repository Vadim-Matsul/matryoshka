import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { cn } from '@/utils/cn';

export interface SplitTextProps {
  text: string | ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number; // 0 = сразу, 1 = весь элемент должен быть в окне
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  playOnce?: boolean;
}

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

function useThresholdVisible(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= threshold),
      { threshold: Array.from({ length: 10 }, (_, i) => i / 10) }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

export function SplitText({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  playOnce = true,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const hasPlayedOnce = useRef(false);
  // @ts-expect-error "_"
  const thresholdVisible = useThresholdVisible(ref, threshold);

  // useEffect(() => {
  //   if (
  //     typeof window === "undefined" ||
  //     !ref.current ||
  //     !text ||
  //     !thresholdVisible
  //   )
  //     return;

  //   // Если playOnce и уже проиграна, НЕ запускаем снова
  //   if (playOnce && hasPlayedOnce.current) return;

  //   // Дождаться загрузки всех шрифтов
  //   document.fonts.ready.then(() => {
  //     const el = ref.current!;
  //     const absoluteLines = splitType === "lines";
  //     if (absoluteLines) el.style.position = "relative";

  //     let splitter: GSAPSplitText;
  //     try {
  //       splitter = new GSAPSplitText(el, {
  //         type: splitType,
  //         absolute: absoluteLines,
  //         linesClass: "split-line",
  //       });
  //     } catch (error) {
  //       console.error("Failed to create SplitText:", error);
  //       return;
  //     }

  //     let targets: Element[] = [];
  //     switch (splitType) {
  //       case "lines": targets = splitter.lines; break;
  //       case "words": targets = splitter.words; break;
  //       case "chars": targets = splitter.chars; break;
  //       default: targets = splitter.chars;
  //     }

  //     if (!targets || targets.length === 0) {
  //       console.warn("No targets found for SplitText animation");
  //       splitter.revert();
  //       return;
  //     }

  //     targets.forEach((t) => {
  //       (t as HTMLElement).style.willChange = "transform, opacity";
  //     });

  //     gsap.set(el, { visibility: "visible" });
  //     gsap.set(targets, { ...from });

  //     const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
  //     const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
  //     const marginUnit = marginMatch ? (marginMatch[2] || "px") : "px";
  //     const start =
  //       marginValue !== 0
  //         ? `top bottom${marginValue > 0 ? `+=${marginValue}${marginUnit}` : `-=${Math.abs(marginValue)}${marginUnit}`}`
  //         : "top bottom";

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: el,
  //         start,
  //         toggleActions: "play none none none",
  //         once: true,
  //         onToggle: (self) => {
  //           scrollTriggerRef.current = self;
  //         },
  //       },
  //       smoothChildTiming: true,
  //       onComplete: () => {
  //         hasPlayedOnce.current = true;
  //         gsap.set(targets, {
  //           ...to,
  //           clearProps: "willChange",
  //           immediateRender: true,
  //         });
  //         onLetterAnimationComplete?.();
  //       },
  //     });

  //     tl.to(targets, {
  //       ...to,
  //       duration,
  //       ease,
  //       stagger: delay / 1000,
  //       force3D: true,
  //     });

  //     // Clean up
  //     return () => {
  //       tl.kill();
  //       if (scrollTriggerRef.current) {
  //         scrollTriggerRef.current.kill();
  //         scrollTriggerRef.current = null;
  //       }
  //       gsap.killTweensOf(targets);
  //       if (splitter) {
  //         splitter.revert();
  //       }
  //     };
  //   });
  // }, [
  //   text,
  //   delay,
  //   duration,
  //   ease,
  //   splitType,
  //   from,
  //   to,
  //   threshold,
  //   rootMargin,
  //   onLetterAnimationComplete,
  //   thresholdVisible,
  //   playOnce,
  // ]);

  return <span>{text}</span>;

  // return (
  //   <div
  //     ref={ref}
  //     className={cn(
  //       `split-parent overflow-hidden inline-block whitespace-normal ${className}`,
  //     )}
  //     style={{
  //       textAlign,
  //       wordWrap: "break-word",
  //       visibility: "hidden",
  //     }}
  //   >
  //     {text}
  //   </div>
  // );
}
