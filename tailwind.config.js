/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f0',
          100: '#ffe4e0',
          200: '#fecdc6',
          300: '#fca99e',
          400: '#fa7a6a',
          500: '#ff4b2b', // Primary
          600: '#e82d26',
          700: '#c11f24',
          800: '#9d1c25',
          900: '#821c23',
        },
        secondary: {
          50: '#edf6ff',
          100: '#dbeaff',
          200: '#bfdbff',
          300: '#93c4ff',
          400: '#60a5ff',
          500: '#2b76ff', // Secondary
          600: '#1d5de6',
          700: '#1348c2',
          800: '#153b8a',
          900: '#15336e',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
    },
  },
  plugins: [],
};