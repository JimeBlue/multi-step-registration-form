/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#02295A",
        secondary: "#6B7280",
        purplishBlue: "	#473dff",
        pastelBlue: "#ADBEFF",
        lightBlue: "#9CD2FC",
        coolGray: "#9699ab",
        lightGray: "#d6d9e6",
        magnolia: "#f0f6ff",
        alabastar: "	#fafbff",
      },
      fontFamily: {
        sans: ["ubuntu", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
    },
  },

  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        ".container": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.5"),
          paddingRight: theme("spacing.5"),
          maxWidth: "1240px",
        },
      });
    },
  ],
};
