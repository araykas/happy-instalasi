/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0d1117',
          50:  '#161b22',
          100: '#1c2128',
          200: '#21262d',
          300: '#2d333b',
          400: '#373e47',
        },
        cyber: {
          green:  '#4af626',
          green2: '#238636',
          blue:   '#58a6ff',
          red:    '#f85149',
          yellow: '#e3b341',
          purple: '#bc8cff',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Courier New"', 'monospace'],
        sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'cyber': '0 0 12px rgba(74,246,38,0.15), 0 0 24px rgba(74,246,38,0.07)',
        'cyber-blue': '0 0 12px rgba(88,166,255,0.2), 0 0 24px rgba(88,166,255,0.08)',
        'cyber-red': '0 0 12px rgba(248,81,73,0.2)',
      },
      animation: {
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 4px rgba(74,246,38,0.3)' },
          '50%':      { boxShadow: '0 0 16px rgba(74,246,38,0.7)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0 },
        },
        scan: {
          '0%':   { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },
    },
  },
  plugins: [],
}
