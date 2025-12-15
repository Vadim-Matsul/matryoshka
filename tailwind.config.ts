import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    container: {
      // center: true,
      // padding: '2rem',
    },
    screens: {
      // xs: '420px',
      // 'xs+': '540px',
      // 'md+': '900px',
      // '1.5lg': '1180px',
      // '1.5xl': '1440px',
      // '3xl': '1600px',
      // gl: '2020px',
      // ...defaultTheme.screens,
    },
    backgroundSize: {},
    fontSize: {},
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        unbounded: ['var(--font-unbounded)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      borderRadius: {},
      backgroundImage: {},
      gridTemplateRows: {},
      gridTemplateColumns: {},
      keyframes: {},
      textShadow: {},
      animation: {},
      boxShadow: {},
    },
  },
  plugins: [],
} satisfies Config;

export const screens = config.theme.screens;

export default config;
