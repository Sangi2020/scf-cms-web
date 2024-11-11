/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "light": {
          "primary": "#7b57e0", //violet
          "base-100": "#DCE3EB",
          "base-200": "#FFFFFF",
          "base-300": "#F1F3F4",
          "stroke": "#DCDCDD",
          "secondary": "#5DAAEE",
          "accent": "#5395cf",
          "warning": "#FFC565",
          "info": "#5DAAEE",
          "error": "C71026",
          "success": "#0B8A00",
          "neutral" : "#E3E3E3",
          "neutral-content": "#0D0F11",


        },
        "dark": {
          "primary": "#7b57e0", //violet
          "base-100": "#262C36",
          "base-200": "#191D23",
          "base-300": "#0D0F11",
          "stroke": "#576776",
          "secondary": "#47A785",
          "accent": "#5395cf",
          "warning": "#EFB047",
          "info": "#5DAAEE",
          "error": "F53B30",
          "success": "#2AA31F",
          "neutral" : "#2B2E48",
          "neutral-content": "#F1F3F4",
        }
      }

    ],
  },
}

