/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0c',
        panel: '#111114',
        elevated: '#16161a',
        paper: {
          DEFAULT: '#f5f0e3',
          dim: 'rgba(245, 240, 227, 0.65)',
          mute: 'rgba(245, 240, 227, 0.35)',
          faint: 'rgba(245, 240, 227, 0.12)',
        },
        cmyk: {
          c: '#2db4d8',
          m: '#e6296b',
          y: '#f0b020',
          k: '#0a0a0c',
        },
        gold: {
          DEFAULT: '#e6b938',
          deep: '#c9a227',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        wider2: '0.22em',
        wider3: '0.3em',
      },
      boxShadow: {
        'glow-c': '0 0 24px rgba(45,180,216,0.45), 0 0 64px rgba(45,180,216,0.18)',
        'glow-m': '0 0 24px rgba(230,41,107,0.45), 0 0 64px rgba(230,41,107,0.18)',
        'glow-y': '0 0 24px rgba(240,176,32,0.45), 0 0 64px rgba(240,176,32,0.18)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        cine: 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      keyframes: {
        revealUp: {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'reveal-up': 'revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'flicker': 'flicker 3s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
