/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

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
        sans: ["var(--font-quicksand)", ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        thin: "300",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "700",
        black: "700",
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
        xxs: "280px",
        xs: "480px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default tailwindConfig;
