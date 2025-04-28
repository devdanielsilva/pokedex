// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <--- ISSO aqui é importante!
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
