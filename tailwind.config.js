/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#2397D2',
          yellow: '#FAC914',
          red: '#E52527',
          green: '#22c55e',
          dark: '#1a1d26',
        },
      },
    },
  },
  plugins: [],
}
