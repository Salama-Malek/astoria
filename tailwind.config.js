/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#f7f3ea',
          soft: '#efe8d7',
          card: '#ffffff',
        },
        ink: {
          DEFAULT: '#1a1814',
          soft: '#4a463e',
          mute: '#8a8479',
        },
        cmyk: {
          c: '#2db4d8',
          m: '#e6296b',
          y: '#f0b020',
          k: '#1a1814',
        },
        gold: {
          DEFAULT: '#c9a227',
          bright: '#e6b938',
          deep: '#8a6a1f',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        warm: '0 2px 8px rgba(101, 79, 30, 0.06), 0 1px 3px rgba(101, 79, 30, 0.04)',
        'warm-md': '0 8px 24px rgba(101, 79, 30, 0.08), 0 4px 8px rgba(101, 79, 30, 0.05)',
        'warm-lg': '0 24px 48px rgba(101, 79, 30, 0.12), 0 8px 16px rgba(101, 79, 30, 0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'reveal-up': 'revealUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'marquee': 'marquee 45s linear infinite',
        'pulse-soft': 'pulseSoft 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(110%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.3)' },
        },
      },
    },
  },
  plugins: [],
};
