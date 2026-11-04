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
        sans: ['"Noto Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '4px',
        md: '6px',
        lg: '6px',
        xl: '6px',
        '2xl': '6px',
        '3xl': '6px',
      },
      boxShadow: {
        DEFAULT: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        md: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        lg: '0 2px 6px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
