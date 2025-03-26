/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        'google-sans': ['Google Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-large': ['57px', '64px'],
        'display-medium': ['45px', '52px'],
        'display-small': ['36px', '40px'],
        'headline-large': ['32px', '40px'],
        'headline-medium': ['28px', '36px'],
        'headline-small': ['24px', '32px'],
        'title-large': ['22px', '28px'],
        'title-medium': ['16px', '24px'],
        'title-small': ['14px', '20px'],
        'body-large': ['16px', '24px'],
        'body-medium': ['14px', '20px'],
        'body-small': ['12px', '16px'],
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}