import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

export default config;
