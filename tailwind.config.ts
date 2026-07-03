import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        brand: {
          primary:   "#14B8A6",
          secondary: "#0F766E",
          accent:    "#F59E0B",
          bg:        "#F8FAFC",
          text:      "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'Bebas Neue'", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(20,184,166,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        "glass-hover": "0 16px 48px rgba(20,184,166,0.15), 0 4px 16px rgba(0,0,0,0.06)",
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(20,184,166,0.06)",
        "card-hover": "0 8px 32px rgba(20,184,166,0.16), 0 2px 8px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "teal-gradient": "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)",
        "teal-soft": "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
        "hero-gradient": "linear-gradient(160deg, #0F172A 0%, #134e4a 40%, #0F766E 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-in": "fadeIn 0.4s ease both",
        "slide-in": "slideIn 0.4s cubic-bezier(.22,1,.36,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideIn: { "0%": { opacity: "0", transform: "translateY(16px) scale(0.97)" }, "100%": { opacity: "1", transform: "translateY(0) scale(1)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseSoft: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.7" } },
      },
    },
  },
  plugins: [],
};
export default config;
