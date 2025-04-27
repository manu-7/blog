/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: "class", 
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  safelist: [
    'active',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // Add more color customizations as needed
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Add other plugins here if needed
  ],
};
