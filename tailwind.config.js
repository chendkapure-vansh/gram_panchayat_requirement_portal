/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gem: {
          navy: '#0B2545',
          navyDark: '#07162C',
          navyLight: '#133E87',
          saffron: '#D97706',
          saffronDark: '#B45309',
          saffronLight: '#FBBF24',
          green: '#15803D',
          greenLight: '#DCFCE7',
          surface: '#F8FAFC',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

