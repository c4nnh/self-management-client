/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: '500px',
        },
      },
      colors: {
        primary: '#1677ff',
        dark: '#001529',
      },
    },
  },
  plugins: [],
}
