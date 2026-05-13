/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#F9F7F2',
        'ink': '#1A1A1A',
        'ink-muted': '#4A4A4A',
        'accent': '#9A8478', // Un bronzo/marrone sofisticato
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'mono': ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
