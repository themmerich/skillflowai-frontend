/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './src/**/*.{html,ts}', // Include all HTML and TypeScript files in the src folder
  ],
  plugins: [require('tailwindcss-primeui')],
};
