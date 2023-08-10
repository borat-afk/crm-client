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
        'app-logo': "url('/CRM_agent_logo.png')",
        'app-forbidden': "url('403ForbiddenError.jpg')"
      },
      colors: {
        'white': '#FFFFFF',
        'black': '#000',
        'primary-black': '#151313',
        'primary': '#0F1E54',
        'secondary': '#35353535',
        'light-blue': '#567AFB',
        'secondary-light': '#9aa9d3',
        'light': '#C4C4C4',
        'gray': '#8d8989',
        'green': '#178f1b',
        'light-green': '#3fe344',
        'red': '#ab1515',
        'light-red': '#ff2121',
        'blue-opacity': 'rgba(86,122,251,0.15)',
        'light-opacity': 'rgba(229,229,229,0.25)'
      }
    },
  },
  plugins: [],
}

