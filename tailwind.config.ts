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
        // Paleta principal (basada en las capturas)
        'brand-dark': '#212529', // (El fondo oscuro del header/footer)
        'brand-gold': {
          DEFAULT: '#E6A12E', // (Tono oro/amarillo del botón "Registrarse")
          500: '#E6A12E',
          600: '#D49429', // (Ligeramente más oscuro para hover)
        },
        'brand-gray': {
          100: '#F8F9FA', // (Fondo blanco/gris claro de Precios/Términos)
          500: '#6C757D', // (Texto de descripción gris)
          700: '#495057', // (Bordes de inputs)
        },
        'brand-text': {
          dark: '#343A40', // (Texto principal sobre fondo blanco)
          light: '#F8F9FA', // (Texto principal sobre fondo oscuro)
        }
      }
    },
  },
  plugins: [
    // Plugins necesarios para los formularios y menús
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
  ],
}
export default config
