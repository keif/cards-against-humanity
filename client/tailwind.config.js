/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-gray-dark': '#1a1a1a',
        'brand-gray': '#333333',
        'brand-gray-light': '#f5f5f5',
        'brand-warning': '#fbbf24',
        'footer-text': '#cccccc',
        'footer-text-muted': '#999999',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'xs': '13px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px',
        '6xl': '36px',
        '7xl': '40px',
        '8xl': '48px',
      },
      maxWidth: {
        'content-sm': '600px',
        'content-md': '800px',
        'content-lg': '1200px',
      },
      spacing: {
        '18': '72px',
      },
    },
  },
  plugins: [],
}
