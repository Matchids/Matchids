import type { Config } from "tailwindcss";

/**
 * Matchids design tokens.
 * Derived from the brand mark: two figures forming an "M", a book, and a heart.
 * Palette is warm and saturated (not the generic cream/terracotta AI default),
 * paired with a rounded display face that echoes the logo's soft blob shapes.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B1B3A", // wordmark navy — primary text
        cream: "#FFF9F0", // warm background, not stark white
        coral: {
          DEFAULT: "#FF6B6B",
          dark: "#E8524F",
        },
        gold: {
          DEFAULT: "#FFB627",
          dark: "#E89F0E",
        },
        teal: {
          DEFAULT: "#14B8A6",
          dark: "#0D9488",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          dark: "#7C3AED",
        },
        sky: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        blob: "2rem",
      },
      backgroundImage: {
        "matchids-arc":
          "linear-gradient(120deg, #FF6B6B 0%, #FFB627 25%, #14B8A6 55%, #3B82F6 80%, #8B5CF6 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
