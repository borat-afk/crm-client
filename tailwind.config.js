/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'app-bg': "url('/bg_crm.png')",
      },
      colors: {
        'white': '#FFFFFF',
        'black': '#000',
        'primary': '#0F1E54',
        'secondary': '#C6D9EE',
        'light-blue': '#567AFB',
        'light': '#C4C4C4',
        'light-opacity': 'rgba(229,229,229,0.25)'
      }
    },
  },
  plugins: [],
}

