/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Italiana: ['Italiana', 'sans-serif'],
        SpaceGrotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors:{
        primary: "#8D3A84",
      }
    },
  },
  plugins: [],
}