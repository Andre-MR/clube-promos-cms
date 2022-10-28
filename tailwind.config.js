const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(device-height: 100vh) and (min-width: 768px)' },
        'tall-2xl': { 'raw': '(device-height: 100vh) and (min-width: 1536px)' }
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }
      })
    })
  ],
}
