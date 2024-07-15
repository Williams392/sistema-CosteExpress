/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // yo
    "./node_modules/flowbite/**/*.js" // yo
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // yo
  ],
}

