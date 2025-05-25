/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-in forwards',
      },
      colors: {
        navbar: '#546b57',
        secondary: '#dca483',
        neutral: '#808a6c',
        base: {
          100: '#3d4451',
        },
      },
      maxHeight: {
        dvh: '100dvh',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          // Optional noch mehr anpassen:
          // Definiert die Farbwerte für das DaisyUI Theme
          primary: '#e7dfd8',
          secondary: '#dca483',
          accent: '#37cdbe',
          neutral: '#808a6c',
          info: '#3abff8',
          navbar: '#546b57',
          success: '#f3dbb9',
          warning: '#D84040',
          error: '#f87272',
        },
      },
    ],
  },
}
