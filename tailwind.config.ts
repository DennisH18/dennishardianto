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
      colors: {
        // Define your custom colors here
        'slate-50': '#f8fafc',
        'blue-500': '#3b82f6',
      },
      filter: { // Enable dark mode for the filter utility
        'invert': 'invert(1)',
        'grayscale': 'grayscale(1)',
        'brightness': 'brightness(0.5)',
      },
      animation: {
        'expand-left-to-right': 'expand-left-to-right 0.5s ease',
        'expand': 'expand 0.5s ease-in-out',
      },
      keyframes: {
        'expand-left-to-right': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'expand': {
          from: { transform: 'scaleY(0)', transformOrigin: 'top' },
          to: { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode for background colors
      textColor: ['dark'],       // Enable dark mode for text colors
      filter: ['dark'],          // Enable dark mode for filters
    },
  },
};

export default config;
