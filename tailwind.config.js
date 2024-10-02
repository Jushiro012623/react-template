/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'multiform': 'repeat(2, minmax(.5fr, 1fr))',
      },
      colors:{
        bg:{
          DEFAULT: '#F5F5F5'
        }
      }
    },
  },
  plugins: [],
}

