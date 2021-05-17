module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: { max: '320px' },
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ['hover', 'active'],
      textOpacity: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
