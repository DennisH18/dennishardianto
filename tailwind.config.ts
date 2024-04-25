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
        "expand": 'expand 0.5s ease-in-out',
      },
      keyframes: {
        'expand-left-to-right': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        "expand": {
          from: { transform: 'scaleY(0)', transformOrigin: 'top' },
          to: { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
    },
  },
};
export default config;
