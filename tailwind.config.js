/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        display: ['Raleway', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#5DADE2', // Calm Sky Blue
          hover: '#85C1E9'
        },
        dark: {
          bg: '#000000',
          surface: '#0A0A0A',
          border: '#1A1A1A',
          hover: '#111111'
        }
      },
      keyframes: {
        'crazy-slide-fade': {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'tab-switch': {
          '0%': { opacity: '0', transform: 'translateX(40px) scale(0.9)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)', filter: 'blur(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        }
      },
      animation: {
        'crazy-slide-fade': 'crazy-slide-fade 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'tab-switch': 'tab-switch 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'shimmer': 'shimmer 2s infinite linear',
      }
    },
  },
  plugins: [],
}
