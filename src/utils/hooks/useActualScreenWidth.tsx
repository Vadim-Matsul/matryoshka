import { useEffect, useState, useCallback, useMemo } from "react";
import { screensData, ScreenKeys } from "@/configs/screens";

type ScreenInfo = {
  key: ScreenKeys;
  min: number;
  max: number | null;
};

// Считаем диапазоны только один раз
const screenRanges: ScreenInfo[] = (() => {
  const entries = Object.entries(screensData) as [ScreenKeys, { num: number, str: string }][];
  const sorted = entries.sort((a, b) => a[1].num - b[1].num);
  return sorted.map(([key, value], idx, arr) => ({
    key,
    min: value.num,
    max: arr[idx + 1]?.[1].num ?? null,
  }));
})();

function getScreenKey(width: number): ScreenKeys {
  const found = screenRanges.find(
    ({ min, max }) => width >= min && (max === null || width < max)
  );
  return found ? found.key : "xs";
}

export function useActualScreenWidth() {
  const getCurrentKey = useCallback(() =>
    typeof window !== "undefined" ? getScreenKey(window.innerWidth) : "xs",
    []
  );

  const [screenKey, setScreenKey] = useState<ScreenKeys>(getCurrentKey);

  useEffect(() => {
    let animationFrame: number | null = null;

    const handleResize = () => {
      if (animationFrame !== null) return; // Уже запланировано
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const nextKey = getCurrentKey();
        setScreenKey((prevKey) => (prevKey === nextKey ? prevKey : nextKey));
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [getCurrentKey]);

  // Мемоизация флагов
  const flags = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(screensData) as ScreenKeys[]).map((key) => [
          `is${key.toUpperCase()}`,
          screenKey === key,
        ])
      ) as Record<`is${Uppercase<ScreenKeys>}`, boolean>,
    [screenKey]
  );

  return useMemo(
    () => ({
      screenKey,
      ...flags,
    }),
    [screenKey, flags]
  );
}
