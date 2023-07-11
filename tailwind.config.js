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
        litterBlue: '#308CD8',
        litterBorder: '#2f3336',
        litterLightGray: '#71767b',
        litterLightGrayLight: '#9B9FA2',
        litterLightGrayLighter: '#C6C8CA',
        litterLightGrayLighter2: '#D7D8D9',
        litterLightGrayLighter3: '#D1D3D4',
        litterLightGrayLighter4: '#DCDEDF',
        litterLightGrayLighter5: '#E8E9E9',
        litterDarkGray: '#17181C',
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}