/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropShow: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        appear:{
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rotateShow:{
          "0%": { transform: "rotate(-90deg)", opacity: "0" },
          "100%": { transform: "rotate(0)", opacity: "1" },
        },
        rotateHide:{
          "0%": { transform: "rotate(0)", opacity: "1" },
          "100%": { transform: "rotate(-90deg)", opacity: "0" },
        }
      },

      animation: {
        dropShow: "dropShow .2s linear forwards",
        rotateHide: "rotateShow .3s ease forwards",
        rotateShow: "rotateShow .3s ease forwards",
        appear: "appear .2s linear forwards",
        longerAppear: "show .2s linear .3s forwards",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
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

