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
        },
        modalDrop:{
          "0%": {  top:"0", opacity: "0" },
          "100%": { transform: "translate(-50%, -50%)", top:"50%", left:"50%", opacity: "1" },
        },
        loadingCircle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        }
      },

      animation: {
        dropShow: "dropShow .2s linear forwards",
        rotateHide: "rotateShow .3s ease forwards",
        rotateShow: "rotateShow .3s ease forwards",
        appear: "appear .2s linear forwards",
        longerAppear: "show .2s linear .3s forwards",
        modalDrop: "modalDrop .2s linear forwards",
        loadingCircle: "loadingCircle .7s linear infinite"
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      colors:{
        bg:{
          DEFAULT: '#F5F5F5'
        },
        primary: '#4A90E2',         // Primary Color (Blue)
        accent: '#5B8FF9',     
        stepCompleted: '#8BC34A',
        stepActive: '#4CAF50',      // Step Indicator Active Color (Green)
        background: '#F9F9F9',      // Background Color (Light Gray)
        formBackground: '#FFFFFF',  // Form Background (White)
        inputBorder: '#D1D5DB',     // Input Border Color (Light Gray)
        textPrimary: '#333333',     // Text Color (Primary, Dark Gray)
        textSecondary: '#6B6B6B',   // Text Color (Secondary, Medium Gray)
        error: '#F44336',           // Error Color (Red)
        warning: '#FF9800',         // Warning Color (Orange)
        success: '#8BC34A',         // Success Color (Green)
        subtleAccent: '#9C27B0',    // Subtle Accent Color (Purple)
        lightAccent: '#E1F5FE', 
      }
    },
  },
  plugins: [],
}

