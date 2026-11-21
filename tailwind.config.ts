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
        surface: {
          0: "#080C14",
          1: "#0C1220",
          2: "#10182A",
          3: "#141E32",
          4: "#1A263E",
          border: "#1E2D47",
          borderLight: "#243354",
        },
        brand: {
          blue: "#2563EB",
          blueLight: "#3B82F6",
          blueSubtle: "#1D4ED8",
          indigo: "#4F46E5",
          accent: "#0EA5E9",
          accentMuted: "#0284C7",
        },
        status: {
          critical: "#DC2626",
          criticalBg: "#450A0A",
          criticalBorder: "#7F1D1D",
          high: "#EA580C",
          highBg: "#431407",
          highBorder: "#7C2D12",
          medium: "#D97706",
          mediumBg: "#451A03",
          mediumBorder: "#78350F",
          safe: "#16A34A",
          safeBg: "#052E16",
          safeBorder: "#14532D",
          low: "#0284C7",
          lowBg: "#082F49",
          lowBorder: "#0C4A6E",
        },
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
          muted: "#64748B",
          subtle: "#475569",
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-md': '0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
        'card-lg': '0 10px 15px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.3)',
        'brand': '0 0 20px rgba(37,99,235,0.15)',
        'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0EA5E9 100%)',
        'gradient-surface': 'linear-gradient(180deg, #0C1220 0%, #080C14 100%)',
        'dot-pattern': 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot': '32px 32px',
      },
    },
  },
  plugins: [],
};

export default config;
