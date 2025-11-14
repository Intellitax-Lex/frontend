import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          950: '#012d4d', // Fondo Principal (Azul Oscuro)
          900: '#02416b', // Fondos de Tarjetas
          800: '#03558a', // Bordes / Hover
          700: '#0469a8', // Bordes más claros
          300: '#82c0e6', // Texto (Gris-Azulado)
          200: '#b0d6f0'  // Texto (Más Claro)
        },
        'brand-teal': {
          400: '#26f7c8', // Acento (Hover)
          500: '#00ffc4', // Acento Principal (Botones)
          600: '#00e0ad', // Acento (Oscuro)
          950: '#003d2e'  // (Texto sobre botón teal)
        }
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
  ],
}
export default config