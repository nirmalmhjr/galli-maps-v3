/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      fontWeight: {
        normal: 400, 
        medium: 500, 
        bold: 700,
      }
    },
  },
  plugins: [],
}