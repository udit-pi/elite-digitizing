/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'admin-primary': '#1e40af',
        'admin-primary-hover': '#1e3a8a',
        'admin-secondary': '#64748b',
        'admin-success': '#16a34a',
        'admin-warning': '#f59e0b',
        'admin-danger': '#dc2626',
      },
    },
  },
  plugins: [],
}
