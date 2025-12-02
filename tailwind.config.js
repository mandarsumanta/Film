/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          bg: '#0a0a0a',
          'bg-light': '#1a1a1a',
        },
        accent: {
          gold: '#d4af37',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e0e0e0',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-up-delayed': 'slideUp 0.8s ease-out 0.3s both',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'hero-name': 'heroName 1.2s ease-out',
        'hero-subtitle': 'heroSubtitle 1.2s ease-out 0.4s both',
        'hero-button': 'heroButton 1.2s ease-out 0.8s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        heroName: {
          '0%': { transform: 'translateY(50px)', opacity: '0', letterSpacing: '0.2em' },
          '100%': { transform: 'translateY(0)', opacity: '1', letterSpacing: '0.1em' },
        },
        heroSubtitle: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        heroButton: {
          '0%': { transform: 'translateY(20px)', opacity: '0', scale: '0.9' },
          '100%': { transform: 'translateY(0)', opacity: '1', scale: '1' },
        }
      },
      transitionDuration: {
        '300': '300ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}