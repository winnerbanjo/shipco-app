import type { Config } from "tailwindcss";

/** Shipco Logistics: Apple-minimalist. White #fff, charcoal #18181b, Coca-Cola Red #F40009, sharp edges. */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
        none: "0",
      },
      colors: {
        charcoal: "#18181b",
        shipcoRed: "#F40009",
        "profit-green": "#166534",
        "shipco-red": "#F40009",
        "shipco-red-hover": "#cc0008",
        "shipco-black": "#0a0a0a",
        "shipco-blue": "#2563eb",
        "shipco-border": "#262626",
        "pure-black": "#000000",
        "slate-gray": "#1a1a1a",
        "logistics-blue": "#3b82f6",
        background: "hsl(var(--background))",
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
          DEFAULT: "var(--logistics-blue)",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        /* Shipco brand palette */
        "shipco-bg": "hsl(var(--shipco-bg))",
        "shipco-foreground": "hsl(var(--shipco-foreground))",
        "shipco-muted": "hsl(var(--shipco-muted))",
        "shipco-accent": "hsl(var(--shipco-accent))",
        "shipco-card": "hsl(var(--shipco-card))",
        "shipco-primary": "hsl(var(--shipco-primary))",
        "shipco-primary-foreground": "hsl(var(--shipco-primary-foreground))",
        "shipco-gold": "hsl(var(--shipco-gold))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
