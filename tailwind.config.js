/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Add paths to all your components/pages
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        'primary-hover': '#535bf2',
        secondary: '#f9a825',
        background: '#242424',
        card: '#1a1a1a',
        text: 'rgba(255, 255, 255, 0.87)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        'hero-height': '300px', // Example for hero section
      },
    },
  },
  plugins: [],
};
