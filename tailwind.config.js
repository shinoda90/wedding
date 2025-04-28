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
        base: {
          100: '#3d4451',
        },
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
          secondary: '#f5be89',
          accent: '#37cdbe',
          neutral: '#708195',
          info: '#3abff8',
          navbar: '#708195',
          success: '#36d399',
          warning: '#D84040',
          error: '#f87272',
        },
      },
    ],
  },
}
