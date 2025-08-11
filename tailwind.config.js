/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Regrowx brand colors inspired by African heritage
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#5cb85c',
          500: '#3a9b3a',
          600: '#2d7d2d',
          700: '#256325',
          800: '#1f4f1f',
          900: '#1a421a',
        },
        secondary: {
          50: '#fdf4e6',
          100: '#fae6c0',
          200: '#f5d199',
          300: '#efba72',
          400: '#eaa54b',
          500: '#e59024',
          600: '#cc7a1d',
          700: '#b36516',
          800: '#99500f',
          900: '#803b08',
        },
        accent: {
          50: '#f7f3f0',
          100: '#ede1d7',
          200: '#dbc4ae',
          300: '#c9a685',
          400: '#b7885c',
          500: '#a56a33',
          600: '#8a5529',
          700: '#6f401f',
          800: '#542b15',
          900: '#39160b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}