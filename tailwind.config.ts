import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          soft: '#FAFAF7',
          muted: '#F1F0EA',
          warm: '#F6F3EC',
        },
        ink: {
          DEFAULT: '#0B1220',
          deep: '#05080F',
          soft: '#1E293B',
        },
        foreground: {
          DEFAULT: '#0B1220',
          muted: '#52606D',
          subtle: '#8B97A4',
        },
        brand: {
          DEFAULT: '#1F4FD1',
          light: '#2E7BE6',
          dark: '#0D2E8C',
        },
        gold: {
          DEFAULT: '#B28C47',
          light: '#D9BF84',
          deep: '#8A6A2F',
        },
        border: {
          DEFAULT: '#E6E3DA',
          subtle: '#EFEDE4',
          strong: '#CDC8B8',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'editorial-hero': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(3rem, 6.5vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.5rem, 2.2vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        editorial: '0.28em',
        label: '0.22em',
        tight: '-0.015em',
        tighter: '-0.025em',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(11, 18, 32, 0.08)',
        premium: '0 18px 60px -24px rgba(11, 18, 32, 0.2)',
        editorial: '0 30px 80px -30px rgba(11, 18, 32, 0.22)',
        glow: '0 0 0 1px rgba(31, 79, 209, 0.12), 0 12px 40px -14px rgba(31, 79, 209, 0.25)',
      },
      backgroundImage: {
        'grid-subtle':
          'linear-gradient(to right, rgba(11,18,32,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.04) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(31, 79, 209, 0.10), transparent 60%)',
        'paper': 'radial-gradient(ellipse at top, #FFFFFF 0%, #FAFAF7 55%, #F6F3EC 100%)',
        'ink-gradient': 'linear-gradient(160deg, #05080F 0%, #0B1220 45%, #0D2E8C 130%)',
        'gold-line': 'linear-gradient(90deg, transparent 0%, #B28C47 20%, #D9BF84 50%, #B28C47 80%, transparent 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-up': 'fadeUp 0.9s ease-out',
        'draw-line': 'drawLine 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
