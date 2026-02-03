import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        blue: {
          50: "hsl(209, 56%, 97%)",
          100: "hsl(209, 56%, 94%)",
          200: "hsl(209, 56%, 86%)",
          300: "hsl(209, 56%, 74%)",
          400: "hsl(209, 56%, 64%)",
          500: "hsl(209, 56%, 54%)",
          600: "hsl(209, 56%, 44%)",
          700: "hsl(209, 56%, 34%)",
          800: "hsl(209, 56%, 24%)",
          900: "hsl(209, 56%, 17%)",
          950: "hsl(209, 56%, 10%)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.8',
            },
            'p:first-of-type': {
              marginTop: '0',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              marginTop: '2.5em',
              marginBottom: '1em',
              lineHeight: '1.3',
              color: 'hsl(var(--foreground))',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: '2em',
              marginBottom: '0.75em',
              lineHeight: '1.4',
              color: 'hsl(var(--foreground))',
            },
            h4: {
              fontSize: '1.25rem',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              color: 'hsl(var(--foreground))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            ul: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            ol: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul > li': {
              paddingLeft: '0.5em',
            },
            'ol > li': {
              paddingLeft: '0.5em',
            },
            code: {
              color: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: 'hsl(var(--primary))',
                opacity: '0.8',
              },
            },
            blockquote: {
              fontStyle: 'normal',
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--primary))',
              borderLeftWidth: '4px',
              paddingLeft: '1.5em',
              marginTop: '2em',
              marginBottom: '2em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
} satisfies Config;
