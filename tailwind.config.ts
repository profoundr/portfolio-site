import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      satoshi: ["Satoshi-Light"],
      roboto: ["var(--font-roboto-light)"],
      interTight: ["var(--font-inter-tight)"],
    },
    extend: {
      fontSize: {
        large: "2.75rem",
        small: "1.75rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "screen-3xl": "1980px",
      },
      keyframes: {
        fadeIn65: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "0.65",
            transform: "translateY(0)",
            filter: "blur(0px)",
          },
        },
        fadeInBlur: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0px)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 0%, 50% 0%",
          },
          to: {
            backgroundPosition: "350% 0%, 350% 0%",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUpBlur: {
          "0%": {
            opacity: "0",
            transform: "translateY(0)",
            filter: "blur(10px)",
          },
          "50%": {
            opacity: "0.5",
            transform: "translateY(0)",
            filter: "blur(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "blur(0px)",
          },
        },
        radialBloomKey: {
          "0%": {
            clipPath: "circle(0% at 95% 5%)",
            // opacity: '1'
          },
          "100%": {
            clipPath: "circle(150% at 95% 5%)",
            // opacity: '0'
          },
        },
        radialBloomKeyDelay: {
          "0%": {
            clipPath: "circle(0% at 95% 5%)",
            // opacity: '1'
          },

          "50%": {
            clipPath: "circle(0% at 95% 5%)",
            // opacity: '1'
          },
          "100%": {
            clipPath: "circle(150% at 95% 5%)",
            // opacity: '0'
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out 1s forwards",
        fadeInLight: "fadeIn65 0.5s ease-out 1s forwards",
        aurora: "aurora 60s linear infinite",
        slideUp: "slideUp 0.5s ease-in-out forwards",
        radialBloom: "radialBloomKey 1.3s ease-in-out forwards",
      },
      colors: {
        border: "hsl(var(--border))",
        borderSecondary: "rgba(10,10,10,0.2)",
        fontPrimary: "#1a322e",
        background: "hsl(var(--background))",
        backgroundSecondary: "#f1f1f1",
        fontSecondary: "#ffffff",
        fontTertiary: "#3c3630",
        slateBg: "#ffffff",
        slateText: "#000000",
        slateGray: "#2f2f2f",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
