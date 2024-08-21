/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans : ["ikea-font", "sans-serif"], // 'ikea' is the class you can use in your components
      },
      colors: {
        "ikea-yellow": "#FFDB00",
        "ikea-grey": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
