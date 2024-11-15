// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'input-height': '43px', 
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow:{
        'navbar': '5px 7px 26px -5px rgb(205, 212, 231)',
      },
      animation: {
        'wave-pulse': 'wavePulse 1.5s infinite',
      },
      keyframes: {
        wavePulse: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(0, 255, 0, 0.7)', 
          },
          '100%': {
            boxShadow: '0 0 0 10px rgba(0, 255, 0, 0)', 
          },
        },
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;

