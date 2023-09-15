/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#02295A",
        secondary: "#6B7280",
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
