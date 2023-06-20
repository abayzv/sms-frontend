/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // skyblue color scheme
        primary: {
          50: "#f2faff",
          100: "#e6f5ff",
          200: "#bfe6ff",
          300: "#99d6ff",
          400: "#4dbaff",
          500: "#00a3ff",
          600: "#0092e6",
          700: "#007abf",
          800: "#006299",
          900: "#004d7d",
        }
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
