import { useSpring, motion } from 'motion/react';
import { useRef } from 'react';

type ParallaxCardProps = {
  /** Контент внутри карточки */
  children: React.ReactNode;
  /** Насколько сильно реагирует на движение мыши (в градусах) */
  rotateAmplitude?: number;
  /** Во сколько раз увеличивается при наведении */
  scaleOnHover?: number;
  /** Класс для обертки */
  className?: string;
  /** Стиль для контейнера */
  style?: React.CSSProperties;
};

export function ParallaxCard({
  children,
  rotateAmplitude = 4,
  scaleOnHover = 1.015,
  className = "",
  style = {},
}: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const rotateY = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });

  function handleMouse(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleEnter() {
    scale.set(scaleOnHover);
  }
  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative will-change-transform [perspective:800px] flex items-center justify-center ${className}`}
      style={style}
      onMouseMove={handleMouse}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={undefined}
      initial={false}
    >
      <motion.div
        className="w-full h-full [transform-style:preserve-3d]"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}