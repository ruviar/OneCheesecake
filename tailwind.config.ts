import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F3EB",
        "dusty-blue": "#7B96A6",
        chocolate: "#4A2E1B",
        gold: "#D4B872",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        accent: ["var(--font-caveat)", "cursive"],
        sans: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      keyframes: {
        nudge: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        nudge: "nudge 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
