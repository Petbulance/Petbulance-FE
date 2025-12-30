/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        bp360: "360px",
        bp620: "620px",
        bp1194: "1194px",
      },
      maxWidth: {
        phone: "620px",
      },
    },
  },
  plugins: [],

};
