import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['28px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.6px' }],
        'h1': ['22px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-strong': ['15px', { lineHeight: '1.6', fontWeight: '600' }],
        'caption': ['12px', { lineHeight: '1.5', fontWeight: '600' }],
        'small': ['11px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      colors: {
        primary: {
          DEFAULT: '#0D367A',
          light: '#1a4a9e',
          dark: '#092552',
          50: '#eef4ff',
          100: '#d9e5ff',
          200: '#bcd2ff',
          500: '#0D367A',
          600: '#0a2d66',
          700: '#092552',
        },
        accent: {
          gold: '#FFD000',
          amber: '#FFC107',
          yellow: '#FACC15',
        },
        secondary: {
          orange: '#FD761A',
          DEFAULT: '#FD761A',
        },
        success: {
          DEFAULT: '#3CCF91',
          light: '#22C55E',
          50: '#f0fdf4',
        },
        error: {
          DEFAULT: '#D32F2F',
          light: '#EF4444',
          50: '#fef2f2',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          low: 'var(--surface-low)',
          high: 'var(--surface-high)',
        },
        scaffold: 'var(--scaffold)',
        outline: 'var(--outline)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
        'button': '16px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 26, 66, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 26, 66, 0.12)',
        'nav': '0 -2px 16px rgba(0, 26, 66, 0.08)',
        'button': '0 4px 12px rgba(13, 54, 122, 0.25)',
      },
      height: {
        'button': '58px',
        'nav': '80px',
        'appbar': '56px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
