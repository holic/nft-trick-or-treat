const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        rainfall: {
          "0%": { transform: "rotate(-12deg)" },
          "100%": { transform: "translate(250px, 1000px) rotate(-12deg)" },
        },
      },
      animation: {
        rainfall: "rainfall 1.5s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
