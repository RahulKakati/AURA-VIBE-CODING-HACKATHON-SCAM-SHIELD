import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          darkest: "#05070E",
          darker: "#0A0E1A",
          dark: "#0F1626",
          card: "#131C31",
          cardHover: "#18243E",
          border: "#1E2C4B",
          borderGlow: "#2563EB40",
          cyan: "#00F0FF",
          blue: "#3B82F6",
          electric: "#0EA5E9",
          neonGreen: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
          critical: "#DC2626",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan": "scan 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 5px rgba(0, 240, 255, 0.3))" },
          "100%": { filter: "drop-shadow(0 0 15px rgba(0, 240, 255, 0.7))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
