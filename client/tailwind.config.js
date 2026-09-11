/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#FAFAFA",
          dark: "#050508",
        },
        surface: {
          light: "#FFFFFF",
          dark: "rgba(255, 255, 255, 0.03)",
        },
        indigo: {
          brand: "#6366F1",
          hover: "#4F46E5",
          glow: "rgba(99, 102, 241, 0.2)",
        },
      },
      fontFamily: {
        belanosima: ["Belanosima", "sans-serif"],
        instrumentsans: ["'Instrument Sans'", "sans-serif"],
        josefinsans: ["'Josefin Sans'", "sans-serif"],
        notokhmer: ["'Noto Sans Khmer'", "sans-serif"],
        comfortaa: ["Comfortaa", "sans-serif"],
        bungee: ["'Bungee Spice'", "cursive"],
        jersey: ["'Jersey 10'", "cursive"],
      },
    },
  },
  plugins: [],
};
