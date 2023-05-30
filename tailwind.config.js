/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,css,scss,sass,less,styl}',
  ],
  darkMode: 'class', // false, 'media' or 'class'
  theme: {
    extend: {
      bgGradientDeg: {
        170: '170deg'
      },
      colors: {
        primary     : 'var(--primary)',
        secondary   : 'var(--secondary)',
        tertiary    : 'var(--tertiary)',
        accent      : 'var(--accent)'
      },
      minHeight: {
        '24': '24rem',
      },
      spacing: {
        '88': '22rem'
      },
      width: {
        '128': '32rem',
      },
      zIndex: {
        '100': '100',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: []
}