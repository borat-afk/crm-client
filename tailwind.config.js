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
        'app-logo': "url('/CRM_agent_logo.png')"
      },
      colors: {
        'white': '#FFFFFF',
        'black': '#000',
        'primary': '#0F1E54',
        'secondary': '#C6D9EE',
        'light-blue': '#567AFB',
        'secondary-light': '#9aa9d3',
        'light': '#C4C4C4',
        'gray': '#8d8989',
        'green': '#178f1b',
        'light-green': '#3fe344',
        'blue-opacity': 'rgba(86,122,251,0.15)',
        'light-opacity': 'rgba(229,229,229,0.25)'
      }
    },
  },
  plugins: [],
}

