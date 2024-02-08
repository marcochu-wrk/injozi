/** @type {import('tailwindcss').Config} */
const colours = require('tailwindcss/colors');

module.exports = {
  mode:'jit',
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gray: colours.blueGray,
      fontFamily:{
        'Lato':['Lato']
      }
    },
  },
  plugins: [],
}

