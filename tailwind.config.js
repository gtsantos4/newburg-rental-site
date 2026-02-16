/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          dark: '#152a45',
          light: '#2a4f7f',
        },
        accent: {
          DEFAULT: '#4a7c59',
          50: '#f0f7f0',
          100: '#d4e8d4',
          500: '#4a7c59',
          600: '#3d6b4a',
          700: '#2d5a3a',
        },
      },
      fontFamily: {
        sans: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
