/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00f3ff',
          neonGreen: '#39ff14',
          purple: '#9d4edd',
          amber: '#ffb703',
          darkBg: '#050811',
          panel: '#090d1a',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 15px rgba(0, 243, 255, 0.8))' },
          '50%': { opacity: 0.7, filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.4))' },
        }
      }
    },
  },
  plugins: [],
}
