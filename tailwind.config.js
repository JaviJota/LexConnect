/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      spacing: {
        '2.1': '0.525rem',
        '2.2': '0.55rem',
        '2.3': '0.575rem',
      },
      borderWidth: {
        '1.25': '1.25px'
      }
    },
  },
  plugins: [],
}

