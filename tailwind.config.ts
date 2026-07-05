import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6F3EB",
          50: "#FBFAF6",
          100: "#F6F3EB",
          200: "#EDE6D6",
          300: "#E0D5BB",
        },
        dustyblue: {
          DEFAULT: "#7B96A6",
          50: "#EEF2F4",
          100: "#D6DFE5",
          300: "#A8BAC4",
          500: "#7B96A6",
          700: "#5A7180",
          900: "#3D4F5A",
        },
        choco: {
          DEFAULT: "#4A2E1B",
          50: "#F1E9E2",
          200: "#C8AE99",
          500: "#7A5236",
          700: "#4A2E1B",
          900: "#2A1810",
        },
        gold: {
          DEFAULT: "#D4B872",
          100: "#F0E6CC",
          300: "#E2CFA0",
          500: "#D4B872",
          700: "#A8904F",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        shrik: ["var(--font-shrikhand)", "Georgia", "serif"],
        hand: ["var(--font-caveat)", "cursive"],
        body: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.29 0 0 0 0 0.18 0 0 0 0 0.10 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wobble: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-12px) rotate(2deg)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        wobble: "wobble 6s ease-in-out infinite",
      },
      boxShadow: {
        retro: "6px 6px 0 0 #4A2E1B",
        "retro-blue": "6px 6px 0 0 #7B96A6",
        "retro-gold": "4px 4px 0 0 #D4B872",
      },
      borderRadius: {
        "ticket": "18px",
      },
    },
  },
  plugins: [],
};

export default config;
