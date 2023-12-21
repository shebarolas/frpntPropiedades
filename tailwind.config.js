/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ab2ae",
        primary_dark: "#003049",
        secondary: "#e2e2e2",
      },
    },
  },
  plugins: [],
};
