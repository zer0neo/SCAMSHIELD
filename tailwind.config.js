/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shield: {
          bg: '#070B14',
          surface: '#0D1527',
          card: '#111D35',
          'card-hover': '#162544',
          border: '#1E2F4D',
          'border-subtle': '#162238',
          accent: '#0EA5E9',
          'accent-glow': '#38BDF8',
          safe: '#10B981',
          'safe-bg': 'rgba(16, 185, 129, 0.1)',
          'safe-border': 'rgba(16, 185, 129, 0.25)',
          warning: '#F59E0B',
          'warning-bg': 'rgba(245, 158, 11, 0.1)',
          'warning-border': 'rgba(245, 158, 11, 0.25)',
          danger: '#EF4444',
          'danger-bg': 'rgba(239, 68, 68, 0.12)',
          'danger-border': 'rgba(239, 68, 68, 0.3)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Noto Sans',
          'Noto Sans Devanagari',
          'Noto Sans Kannada',
          'sans-serif',
        ],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(14, 165, 233, 0.3)',
        'glow-danger': '0 0 35px -5px rgba(239, 68, 68, 0.35)',
        'glow-warning': '0 0 30px -5px rgba(245, 158, 11, 0.3)',
        'glow-safe': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
