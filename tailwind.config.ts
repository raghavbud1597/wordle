import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    
    extend: {
      fontFamily: {
        primary: ["Poppins", "serif"],
        secondary: [ "IBM Plex Serif", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        growShrink: 'grow-shrink 0.5s ease-in-out',
        rotate: 'rotate 0.5s ease-in-out',
      },
      keyframes: {
        'grow-shrink': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        rotate: {
          '0%': { transform: 'perspective(400px) rotateX(0deg)' },
          '50%': { transform: 'perspective(400px) rotateX(180deg)' },
          '100%': { transform: 'perspective(400px) rotateX(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
