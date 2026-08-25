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
        cyber: {
          dark: '#0a0e17',
          darker: '#06090e',
          card: '#0f172a',
          cardHover: '#1e293b',
          border: '#1e293b',
          accent: '#06b6d4',
          accentHover: '#0891b2',
          danger: '#ef4444',
          dangerGlow: 'rgba(239, 68, 68, 0.2)',
          warning: '#f59e0b',
          warningGlow: 'rgba(245, 158, 11, 0.2)',
          success: '#10b981',
          successGlow: 'rgba(16, 185, 129, 0.2)',
          info: '#3b82f6',
        }
      },
      boxShadow: {
        'cyber-cyan': '0 0 20px rgba(6, 182, 212, 0.25)',
        'cyber-emerald': '0 0 20px rgba(16, 185, 129, 0.25)',
        'cyber-rose': '0 0 20px rgba(239, 68, 68, 0.25)',
        'cyber-amber': '0 0 20px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
