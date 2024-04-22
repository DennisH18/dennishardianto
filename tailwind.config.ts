// tailwind.config.js

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        'expand-left-to-right': 'expand-left-to-right 0.5s ease',
        'expand-to-bottom': 'expand-to-bottom 0.5s ease',
      },
      keyframes: {
        'expand-left-to-right': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'expand-to-bottom': {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
    },
  },
};
export default config;
