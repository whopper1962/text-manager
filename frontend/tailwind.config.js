/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
