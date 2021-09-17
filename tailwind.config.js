module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      width: {
        container: '475px'
      },
      height: {
        'card-small': '68px',
        'card-medium': '84px',
        'card-large': '100px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
