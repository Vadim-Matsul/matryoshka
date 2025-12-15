export const screensData = {
  xs: {
    num: 320,
    str: '320px',
  },
  sm: {
    num: 640,
    str: '640px',
  },
  md: {
    num: 768,
    str: '768px',
  },
  lg: {
    num: 1024,
    str: '1024px',
  },
  '1_5lg': {
    num: 1180,
    str: '1180px',
  },
  xl: {
    num: 1280,
    str: '1280px',
  },
  '1_5xl': {
    num: 1440,
    str: '1440px',
  },
} as const;

export type ScreenKeys = keyof typeof screensData;
