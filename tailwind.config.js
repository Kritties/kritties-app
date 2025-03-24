module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // si usás app router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  theme: {
   extend: {
     fontFamily: {
       handjet: ['var(--font-handjet)'],
     },
   },
 },
};