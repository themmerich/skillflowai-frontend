/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}', // Include all HTML and TypeScript files in the src folder
  ],
  theme: {
    colors: {
      //primary: '#5c6ac4',
      //secondary: '#ecc94b',
      // ...
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
