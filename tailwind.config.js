/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "like-black":"#1D1D1D",
        "main-bg":"#0E0E0E",
        "border-bottom":"#E7E7E7",
      },
      height:{
        "height":"722px"
      }
    },
  },
  plugins: [],
};
