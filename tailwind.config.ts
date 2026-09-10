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
        floresta: {
          950: "#0B140F",
          900: "#101D16",
          800: "#16281E", // Cor institucional primária
          700: "#1E382A",
          600: "#274B38",
          500: "#36674D",
        },
        ambar: {
          300: "#F2D299",
          400: "#E3BC72",
          500: "#D4A359", // Raio de Sol / Dourado institucional
          600: "#B8863A",
          700: "#8F6322",
        },
        areia: {
          50: "#FCFBF8",
          100: "#F8F6F0", // Areia Nobre / Fundo Claro
          200: "#EFECE2",
          300: "#E2DDD0",
          400: "#CBC3B2",
        },
        pedra: {
          950: "#0C0A09",
          900: "#1C1917", // Grafite pedra escuro
          800: "#292524",
          700: "#44403C",
          600: "#57534E",
        },
        sage: {
          300: "#A3B18A",
          400: "#8FA87A",
          500: "#7F9A83", // Verde-sálvia accent secundário
          600: "#6B8A6E",
          700: "#527A55",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Playfair Display", "Merriweather", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["clamp(1.75rem, 3.5vw + 0.75rem, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.15rem, 4vw + 0.85rem, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.5rem, 4.5vw + 1rem, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.85rem, 5vw + 1.25rem, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
      },
      spacing: {
        "section-sm": "clamp(2.25rem, 4vw + 1rem, 5rem)",
        "section-md": "clamp(3rem, 5vw + 1.25rem, 7rem)",
        "section-lg": "clamp(3.75rem, 6vw + 1.5rem, 9rem)",
        "section-xl": "clamp(4.5rem, 7vw + 2rem, 12rem)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        solar: "0 0 35px -5px rgba(212, 163, 89, 0.18)",
        "solar-intense": "0 0 50px 0px rgba(212, 163, 89, 0.35)",
        "solar-glow": "0 0 80px 10px rgba(212, 163, 89, 0.12)",
        floresta: "0 20px 40px -15px rgba(16, 29, 22, 0.7)",
        "elevated-sm": "0 2px 8px -2px rgba(0,0,0,0.3), 0 4px 16px -4px rgba(0,0,0,0.2)",
        "elevated-md": "0 4px 16px -4px rgba(0,0,0,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
        "elevated-lg": "0 8px 32px -8px rgba(0,0,0,0.5), 0 16px 64px -16px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "radial-floresta": "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(30, 56, 42, 0.6) 0%, transparent 70%)",
        "radial-ambar": "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212, 163, 89, 0.08) 0%, transparent 70%)",
        "radial-hero": "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(30, 56, 42, 0.5) 0%, rgba(11, 20, 15, 0) 60%)",
        "gradient-editorial": "linear-gradient(180deg, rgba(11, 20, 15, 0) 0%, rgba(11, 20, 15, 1) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px 0px rgba(212, 163, 89, 0.15)" },
          "50%": { boxShadow: "0 0 40px 5px rgba(212, 163, 89, 0.3)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "counter": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "slide-down": "slide-down 0.4s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "counter": "counter 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
