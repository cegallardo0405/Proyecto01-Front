/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#f5f5f4",
        accent: "#0f766e",
        accentSoft: "#d1fae5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 14px 30px -20px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

