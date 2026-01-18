import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        ink: "#17140f",
        cream: "#f7f2ea",
        clay: "#f0e7dc",
        accent: "#f46b3f",
        accent2: "#1f6feb",
        muted: "#6a5f55",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(23, 20, 15, 0.12)",
      },
      keyframes: {
        floatIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        floatIn: "floatIn 800ms ease both",
      },
    },
  },
  plugins: [],
};

export default config;
