import React, {
  useRef,
  useCallback,
  useMemo,
  memo,
  forwardRef,
  type CSSProperties,
} from "react";

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: CSSProperties;
}

const hexToRgba = (hex: string, opacity: number) => {
  if (!hex.startsWith("#")) return hex;
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(x => x + x).join("");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
};

export const GlareHover = memo(
  forwardRef<HTMLDivElement, GlareHoverProps>((props, ref) => {
    const {
      width = "auto",
      height = "auto",
      background = "transparent",
      borderRadius = "0px",
      borderColor = "transparent",
      children,
      glareColor = "#fff",
      glareOpacity = 0.5,
      glareAngle = -45,
      glareSize = 250,
      transitionDuration = 650,
      playOnce = false,
      className = "",
      style,
      ...rest
    } = props;

    // Мемоизированный rgba-цвет блика
    const rgba = useMemo(
      () => hexToRgba(glareColor, glareOpacity),
      [glareColor, glareOpacity]
    );

    // Мемоизированные стили блика
    const overlayStyle = useMemo<CSSProperties>(
      () => ({
        position: "absolute",
        inset: 0,
        background: `linear-gradient(${glareAngle}deg,
            hsla(0,0%,0%,0) 60%,
            ${rgba} 70%,
            hsla(0,0%,0%,0) 100%)`,
        backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "-100% -100%, 0 0",
        pointerEvents: "none",
        transition: `${transitionDuration}ms ease`
      }),
      [glareAngle, rgba, glareSize, transitionDuration]
    );

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const played = useRef(false);

    // Анимация появления блика
    const animateIn = useCallback(() => {
      const el = overlayRef.current;
      if (!el || (playOnce && played.current)) return;
      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
      // Триггер reflow для перехода без лагов
      void el.offsetHeight;
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = "100% 100%, 0 0";
      if (playOnce) played.current = true;
    }, [playOnce, transitionDuration]);

    // Анимация скрытия блика
    const animateOut = useCallback(() => {
      const el = overlayRef.current;
      if (!el) return;
      if (playOnce) {
        el.style.transition = "none";
        el.style.backgroundPosition = "-100% -100%, 0 0";
      } else {
        el.style.transition = `${transitionDuration}ms ease`;
        el.style.backgroundPosition = "-100% -100%, 0 0";
      }
    }, [playOnce, transitionDuration]);

    return (
      <div
        ref={ref}
        className={`relative grid place-items-center overflow-hidden border ${className}`}
        style={useMemo(
          () => ({
            width,
            height,
            background,
            borderRadius,
            borderColor,
            ...style,
          }),
          [width, height, background, borderRadius, borderColor, style]
        )}
        onMouseEnter={animateIn}
        onMouseLeave={animateOut}
        {...rest}
      >
        <div ref={overlayRef} style={overlayStyle} />
        {children}
      </div>
    );
  })
);

GlareHover.displayName = "GlareHover";
