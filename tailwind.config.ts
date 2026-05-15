import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#F5EEDC",
          light: "#FBF6E8",
          dark: "#E8DEC2",
        },
        ink: {
          DEFAULT: "#1F1812",
          soft: "#3A2E25",
        },
        crimson: {
          DEFAULT: "#7C1F1F",
          dark: "#5A1414",
          light: "#9E3535",
        },
        gold: {
          DEFAULT: "#B08D3A",
          dark: "#8A6C26",
          light: "#D4B25A",
        },
        stone: {
          DEFAULT: "#C9C0AE",
          dark: "#9A917F",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "parchment-noise":
          "radial-gradient(ellipse at top, rgba(176,141,58,0.06), transparent 60%), radial-gradient(ellipse at bottom, rgba(124,31,31,0.04), transparent 60%)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1F1812",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
