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
        // New harmonious color palette for gaming/esports
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff', 
          200: '#c7d6fe',
          300: '#a4b8fc',
          400: '#8b97f8',
          500: '#7c6df1',   // Main brand color - modern purple
          600: '#6d4ce5',
          700: '#5e3bcd',
          800: '#4d31a6',
          900: '#422a85',
          950: '#291952',
        },
        accent: {
          50: '#f0fdff',
          100: '#ccf8ff',
          200: '#99f1ff',
          300: '#4de6ff',   // Electric blue accent
          400: '#00d4ff',   // Bright gaming blue
          500: '#00b8db',
          600: '#0094b8',
          700: '#087594',
          800: '#115f7a',
          900: '#144f66',
        },
        // Gaming electric colors
        electric: {
          blue: '#00d4ff',     // Bright electric blue
          purple: '#7c6df1',   // Main purple
          cyan: '#4de6ff',     // Light cyan
          indigo: '#8b97f8',   // Soft indigo
          violet: '#a4b8fc',   // Light violet
        },
        // Tech colors for better component styling
        tech: {
          cyan: '#00d4ff',
          purple: '#7c6df1',
          blue: '#4de6ff',
          indigo: '#8b97f8',
          violet: '#a4b8fc',
        },
        // Neutral grays for balance
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Glass morphism colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(0, 0, 0, 0.1)',
          border: 'rgba(124, 109, 241, 0.2)',
          shadow: 'rgba(124, 109, 241, 0.1)',
          glow: 'rgba(77, 230, 255, 0.3)',
        },
        // Success, warning, error states
        success: '#10b981',
        warning: '#f59e0b', 
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'Orbitron', 'Inter', 'sans-serif'],
        cyber: ['var(--font-orbitron)', 'Orbitron', 'monospace'],
      },
      fontSize: {
        'display-xl': ['65px', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['52.5px', { lineHeight: '1.15', fontWeight: '600' }],
        'display-md': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'display-sm': ['33px', { lineHeight: '1.25', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Modern gaming mesh background
        'gradient-mesh': `
          radial-gradient(at 90% 90%, rgba(124, 109, 241, 0.08) 0%, transparent 50%),
          radial-gradient(at 40% 80%, rgba(77, 230, 255, 0.06) 0%, transparent 50%),
          radial-gradient(at 80% 20%, rgba(139, 151, 248, 0.04) 0%, transparent 50%),
          radial-gradient(at 20% 50%, rgba(164, 184, 252, 0.05) 0%, transparent 50%)
        `,
        // Sophisticated hero background
        'hero-bg': `
          linear-gradient(135deg, #ffffff 0%, #f9fafb 30%, #f3f4f6 70%, #ffffff 100%),
          radial-gradient(circle at 25% 25%, rgba(124, 109, 241, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(77, 230, 255, 0.02) 0%, transparent 50%)
        `,
        // Electric button gradients
        'button-primary': 'linear-gradient(135deg, #7c6df1 0%, #6d4ce5 50%, #5e3bcd 100%)',
        'button-primary-hover': 'linear-gradient(135deg, #8b97f8 0%, #7c6df1 50%, #6d4ce5 100%)',
        'button-accent': 'linear-gradient(135deg, #00d4ff 0%, #4de6ff 50%, #00b8db 100%)',
        'button-accent-hover': 'linear-gradient(135deg, #4de6ff 0%, #00d4ff 50%, #0094b8 100%)',
        // Modern glass morphism
        'glass-card': `
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.12) 0%, 
            rgba(255, 255, 255, 0.08) 50%, 
            rgba(255, 255, 255, 0.12) 100%
          )
        `,
        'glass-dark': `
          linear-gradient(135deg, 
            rgba(0, 0, 0, 0.1) 0%, 
            rgba(0, 0, 0, 0.05) 50%, 
            rgba(0, 0, 0, 0.1) 100%
          )
        `,
        // Gaming glow effects
        'electric-glow': `
          radial-gradient(circle, 
            rgba(77, 230, 255, 0.4) 0%, 
            rgba(77, 230, 255, 0.2) 25%,
            rgba(124, 109, 241, 0.1) 50%,
            transparent 70%
          )
        `,
        'purple-glow': `
          radial-gradient(circle, 
            rgba(124, 109, 241, 0.3) 0%, 
            rgba(124, 109, 241, 0.15) 40%, 
            transparent 70%
          )
        `,
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.5', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
  // Add support for backdrop filters (glass morphism)
  corePlugins: {
    backdropFilter: true,
  },
};

export default config;