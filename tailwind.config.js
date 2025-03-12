module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx,html}",
    "./components/**/*.{ts,tsx,js,jsx,html}",
    "./app/**/*.{ts,tsx,js,jsx,html}",
    "./src/**/*.{ts,tsx,js,jsx,html}",
  ],
  theme: {
    extend: {
      fontSize: {
        '3x': '3rem',
      },
      colors: {
        dark: {
          200: '#1a1d21',
          300: '#1a1a1a',  // Already defined
          400: '#111111',  // Added from previous fix
          500: '#0a0a0a',  // Already defined
          600: '#333333',  // Add this color for the placeholder
          700: '#333333',
          800: '#0D0F10',
          900: '#000000',
        },
        light: {
          200: '#E8E9E9'
        }
      },
    },
  },
  plugins: [],
}

