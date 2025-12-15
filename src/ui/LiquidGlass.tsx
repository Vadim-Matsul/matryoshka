import { cn } from '@/utils/cn';
import React, { ReactNode, useMemo } from "react";


type Props = {
  children: ReactNode;
  displacementScale?: number;
  className?: string;
  blur?: number;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, char => {
      const rand = Math.random() * 16 | 0;
      const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
      return value.toString(16);
    });
}

export function LiquidGlass({ children, className, displacementScale = 70, blur = 0 }: Props) {
  const id = useMemo(() => uuidv4(), []);

  return (
    <div
      className={cn(
        // "backdrop-blur-[5px]",
        "relative w-full h-full overflow-hidden shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {/* Стеклянные слои */}
      <div
        className="
          absolute inset-0 z-0
        "
        style={{
          backdropFilter: `blur(${blur}px)`,
          filter: `url(#${id})`,
          isolation: "isolate"
        }}
      />

      <div
        className="
          absolute inset-0 z-20
          rounded-inherit overflow-hidden
        "
        style={{
          boxShadow:
            "inset 1px 1px 0 rgba(255,255,255,0.75), inset 0 0 5px rgba(255,255,255,0.75)"
        }}
      />
      {/* Слот для любого контента */}
      <div className="relative z-30 flex items-center justify-center w-full h-full">
        {children}
      </div>

      {/* SVG фильтр (важно! только один раз на страницу!) */}
      <svg style={{ display: "none" }}>
        <filter id={id} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />

          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />

          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale={String(displacementScale)}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
}
