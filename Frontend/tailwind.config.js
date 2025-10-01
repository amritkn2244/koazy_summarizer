/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FDFBF5',
        'surface': '#FFFFFF',
        'primary': '#5D9CEC',
        'primary-hover': '#4A89D9',
        'secondary': '#F0F5FA',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'stroke': '#E5E7EB',

        'dark-background': '#111827',
        'dark-surface': '#1F2937',
        'dark-secondary': '#374151',
        'dark-text-primary': '#F9FAFB',
        'dark-text-secondary': '#9CA3AF',
        'dark-stroke': '#4B5563',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
