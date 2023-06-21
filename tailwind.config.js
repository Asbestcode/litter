/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        litterWhite: '#e7e9ea',
        litterBlue: '#FFA500',
        litterBorder: '#2f3336',
        litterLightGray: '#71767b',
        litterDarkGray: '#17181C',
      }
    },
  },
  plugins: [],
}