/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)", ...fontFamily.sans],
      },

      height: {
        "input-height": "38px",
      },
      margin: {
        "layout-margin": "20px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        navbar: "5px 7px 26px -5px rgb(205, 212, 231)",
      },
      animation: {
        "wave-pulse": "wavePulse 1.5s infinite",
      },
      keyframes: {
        wavePulse: {
          "0%": {
            boxShadow: "0 0 0 0 rgba(0, 255, 0, 0.7)",
          },
          "100%": {
            boxShadow: "0 0 0 10px rgba(0, 255, 0, 0)",
          },
        },
      },
      screens: {
        xxs: "240px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default tailwindConfig;
