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
          "100%": { marginTop: "200%", marginLeft: "30%" },
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
