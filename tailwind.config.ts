import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        western: "#4f2784",
        //gray: "#ededed",
        gray: "#e5e7eb",
        gray_dark: "#495057",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter var", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
