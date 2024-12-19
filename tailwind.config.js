/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myCustomColor: '#161d29',
        myCustomGridColor: '#2b384e',
      },
    },
  },
  plugins: [],
}

