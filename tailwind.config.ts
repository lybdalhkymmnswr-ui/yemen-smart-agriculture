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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // الألوان الترابية للهوية البصرية
        soil: {
          DEFAULT: '#6D4C41',
          light: '#8D6E63',
          dark: '#5D4037',
        },
        growth: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
        beige: {
          DEFAULT: '#F5F5DC',
          light: '#FAFAF0',
          dark: '#E8E4D0',
        },
        sun: {
          DEFAULT: '#FFC107',
          light: '#FFD54F',
          dark: '#FFA000',
        },
        water: {
          DEFAULT: '#2196F3',
          light: '#64B5F6',
          dark: '#1976D2',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        noto: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
