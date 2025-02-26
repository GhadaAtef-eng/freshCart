const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        main: "#0aad0a",
        textMain: "#313539",
        background: "#F0F3F2",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [flowbite.plugin()],
  darkMode: "class",
  red: "text-red",
};
