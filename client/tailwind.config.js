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
        // Legacy names that were referenced but never defined; mapped onto DESIGN.md inks.
        'brand-blue': '#005A9C',
        'brand-yellow': '#FFE800',
        // DESIGN.md "Riso Zine" tokens
        table: {
          DEFAULT: '#1B2B6B',
          raised: '#24387F',
          line: '#33479A',
        },
        pink: {
          DEFAULT: '#FF48B0',
          hover: '#FF5CBA',
          press: '#E8349B',
        },
        paper: {
          DEFAULT: '#F5F2EA',
          shade: '#E6E1D4',
        },
        ink: {
          DEFAULT: '#14183A',
          muted: '#4A4F6E',
        },
        muted: '#A9B4DA',
        focus: '#0078BF',
        'link-paper': '#005A9C',
        riso: {
          yellow: '#FFE800',
        },
        success: '#3DDC84',
        error: '#FF6B5A',
        'footer-text': '#cccccc',
        'footer-text-muted': '#999999',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Atkinson Hyperlegible Next Variable"', 'sans-serif'],
        sans: ['"Atkinson Hyperlegible Next Variable"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Atkinson Hyperlegible Mono Variable"', 'ui-monospace', 'monospace'],
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
      boxShadow: {
        card: '0 3px 0 rgba(10, 14, 40, .35), 0 10px 24px -8px rgba(10, 14, 40, .5)',
        press: '0 3px 0 #E8349B',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.22, 1, .36, 1)',
      },
      spacing: {
        '18': '72px',
      },
      keyframes: {
        slideDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          },
        },
        // Winner reveal: two inks start out of register and converge.
        register: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(.97)', textShadow: '-5px 3px 0 rgba(255,72,176,.9), 4px -3px 0 rgba(0,120,191,.8)' },
          '55%': { opacity: '1', textShadow: '-2px 1px 0 rgba(255,72,176,.9), 2px -1px 0 rgba(0,120,191,.8)' },
          '100%': { opacity: '1', transform: 'none', textShadow: '0 0 0 rgba(255,72,176,0), 0 0 0 rgba(0,120,191,0)' },
        },
        stamp: {
          'from': { opacity: '0', transform: 'rotate(-3deg) scale(1.6)' },
          'to': { opacity: '1', transform: 'rotate(-3deg) scale(1)' },
        },
        slideUp: {
          'from': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          'to': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
        slideIn: 'slideIn 0.3s ease',
        fadeIn: 'fadeIn 0.2s ease',
        slideUp: 'slideUp 0.3s ease',
        register: 'register 620ms cubic-bezier(.22, 1, .36, 1) both',
        stamp: 'stamp 300ms 420ms cubic-bezier(.22, 1, .36, 1) both',
      },
    },
  },
  plugins: [],
}
