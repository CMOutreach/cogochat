import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      colors: {
        brand: {
          50:  "#f0faf7",
          100: "#d6f2e8",
          200: "#aee4d2",
          300: "#77cfb5",
          400: "#3eb494",
          500: "#1e9878",
          600: "#157a60",
          700: "#12614d",
          800: "#114d3e",
          900: "#0f4034",
        },
        dark: "#0a0f0d",
      },
    },
  },
  plugins: [],
};
export default config;
