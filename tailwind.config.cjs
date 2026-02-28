/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      fontFamily: {
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        glow: "0 0 20px rgba(145, 94, 255, 0.15)",
        "glow-lg": "0 0 40px rgba(145, 94, 255, 0.2), 0 0 80px rgba(145, 94, 255, 0.05)",
        "cyan-glow": "0 0 20px rgba(0, 191, 255, 0.15)",
        "3d": "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(145, 94, 255, 0.08)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
