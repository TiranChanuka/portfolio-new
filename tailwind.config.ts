import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-slow-reverse": "float-reverse 10s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "float-particle": "particle-float 12s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-gentle": "bounce-gentle 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 3s ease-in-out infinite",
        "shine-fast": "shimmer 2s ease-in-out infinite",
        // New enhanced animations for the tech badges
        "orbital-float": "orbital-float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer-effect": "shimmer-effect 2.5s ease-in-out infinite",
        "orbital-trail": "orbital-trail 8s linear infinite",
        "energy-pulse": "energy-pulse 2s ease-in-out infinite",
        "particle-drift": "particle-drift 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(0px) translateX(20px)" },
          "75%": { transform: "translateY(20px) translateX(10px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(20px) translateX(-10px)" },
          "50%": { transform: "translateY(0px) translateX(-20px)" },
          "75%": { transform: "translateY(-20px) translateX(-10px)" },
        },
        "particle-float": {
          "0%": {
            transform: "translateY(100vh) translateX(0px)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-100vh) translateX(50px)",
            opacity: "0",
          },
        },
        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-10px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        glow: {
          "0%": {
            boxShadow:
              "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
          },
          "100%": {
            boxShadow:
              "0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.2)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        // New enhanced keyframes for tech badges
        "orbital-float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(-8px) rotate(5deg)",
          },
          "66%": {
            transform: "translateY(4px) rotate(-3deg)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 15px 3px currentColor",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 30px 8px currentColor",
            transform: "scale(1.05)",
          },
        },
        "shimmer-effect": {
          "0%": {
            transform: "translateX(-100%) skewX(-45deg)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%) skewX(-45deg)",
            opacity: "0",
          },
        },
        "orbital-trail": {
          "0%": {
            transform: "rotate(0deg) scale(1)",
            opacity: "0.3",
          },
          "50%": {
            transform: "rotate(180deg) scale(1.1)",
            opacity: "0.6",
          },
          "100%": {
            transform: "rotate(360deg) scale(1)",
            opacity: "0.3",
          },
        },
        "energy-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.7",
          },
          "50%": {
            transform: "scale(1.5)",
            opacity: "1",
          },
        },
        "particle-drift": {
          "0%": {
            transform: "translate(0, 0) scale(0)",
            opacity: "0",
          },
          "25%": {
            transform: "translate(20px, -30px) scale(1)",
            opacity: "1",
          },
          "75%": {
            transform: "translate(-30px, 20px) scale(0.8)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate(0, 0) scale(0)",
            opacity: "0",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
