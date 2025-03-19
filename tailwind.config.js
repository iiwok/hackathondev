/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',     // Dark blue background
        secondary: '#1E293B',   // Slightly lighter blue for cards/sections
        accent: {
          blue: '#38BDF8',      // Neon blue
          purple: '#A855F7',    // Neon purple
          pink: '#EC4899',      // Neon pink
          green: '#4ADE80',     // Neon green
          yellow: '#FACC15',    // Neon yellow
        },
        text: {
          primary: '#F8FAFC',   // Light text
          secondary: '#CBD5E1',  // Slightly darker text
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #38BDF8, 0 0 20px #38BDF8',
        'neon-purple': '0 0 5px #A855F7, 0 0 20px #A855F7',
        'neon-pink': '0 0 5px #EC4899, 0 0 20px #EC4899',
        'neon-green': '0 0 5px #4ADE80, 0 0 20px #4ADE80',
        'neon-yellow': '0 0 5px #FACC15, 0 0 20px #FACC15',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 