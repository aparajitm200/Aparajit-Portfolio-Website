import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────
      colors: {
        bg: {
          DEFAULT: '#0C0C0B',
          elevated: '#141413',
          overlay: '#1A1A18',
        },
        text: {
          DEFAULT: '#E8E4DC',
          muted: '#8A857A',
          subtle: '#504C44',
        },
        accent: {
          DEFAULT: '#C8B89A',
          dim: '#7A6E5E',
        },
        border: {
          DEFAULT: 'rgba(200, 184, 154, 0.12)',
          muted: 'rgba(200, 184, 154, 0.06)',
        },
      },

      // ── Typography ───────────────────────────────
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },

      // ── Spacing ──────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ── Max Widths ───────────────────────────────
      maxWidth: {
        container: '1140px',
        wide: '1280px',
        narrow: '800px',
        text: '640px',
      },

      // ── Screens (breakpoints) ────────────────────
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },

      // ── Border Radius ────────────────────────────
      borderRadius: {
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '16px',
      },

      // ── Animation ────────────────────────────────
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '80': '80ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
} satisfies Config
