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
        neu: {
          bg: "#eef2f6",
          darkBg: "#12151b",
          cardDark: "#1a1e27",
          dark: "#d5dde7",
          light: "#ffffff",
          text: "#334155",
          muted: "#7c8ba1",
          primary: "#1d8cf8",
          primaryHover: "#1577db",
        }
      },
      boxShadow: {
        'neu-flat': '8px 8px 18px rgba(166, 178, 196, 0.42), -8px -8px 18px rgba(255, 255, 255, 0.95)',
        'neu-flat-dark': '8px 8px 20px rgba(0, 0, 0, 0.6), -6px -6px 16px rgba(255, 255, 255, 0.04)',
        'neu-pressed': 'inset 3px 3px 6px rgba(166, 178, 196, 0.45), inset -3px -3px 6px rgba(255, 255, 255, 0.95)',
        'neu-pressed-dark': 'inset 3px 3px 6px rgba(0, 0, 0, 0.6), inset -3px -3px 6px rgba(255, 255, 255, 0.04)',
        'neu-active-item': '10px 14px 28px rgba(148, 163, 184, 0.18), -6px -6px 16px rgba(255, 255, 255, 0.95)',
        'neu-active-item-dark': '8px 12px 24px rgba(0, 0, 0, 0.7), -4px -4px 12px rgba(255, 255, 255, 0.05)',
        'glow-red': '0 0 12px rgba(239, 68, 68, 0.65), 0 2px 5px rgba(239, 68, 68, 0.3)',
        'glow-blue': '0 0 12px rgba(59, 130, 246, 0.65), 0 2px 5px rgba(59, 130, 246, 0.3)',
        'glow-green': '0 0 10px rgba(34, 197, 94, 0.85), 0 0 3px rgba(34, 197, 94, 1)',
        'glow-amber': '0 0 12px rgba(245, 158, 11, 0.6), 0 2px 4px rgba(245, 158, 11, 0.3)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
