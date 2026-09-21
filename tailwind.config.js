/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: '#FF6FAE',
        brandLightPink: '#FFE4F0',
        brandLightBlue: '#DDF3FF',
        brandBlue: '#65B7FF',
        brandText: '#26354A',
      }
    },
  },
  plugins: [],
}
