/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        title: ['"GmarketSansBold"', 'sans-serif'],
        body: ['"Pretendard Variable"', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 