// components/FooterPublico.tsx
import Link from 'next/link';

export function FooterPublico() {
  return (
    // Footer con fondo oscuro (brand-dark)
    <footer className="bg-brand-dark border-t border-blue-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo e Info (ocupa 2 columnas) */}
          <div className="md:col-span-2">
            {/* <img className="h-8 w-auto" src="/logo.png" alt="IntelliTax Lex" /> */}
            <span className="text-2xl font-bold text-white">IntelliTax Lex</span>
            <p className="mt-2 text-sm max-w-xs text-gray-300">
              Base de Conocimiento Tributario de la Dra. Nora Ruoti. Plataforma profesional para consultas tributarias con tecnología de IA.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              © {new Date().getFullYear()} IntelliTax Lex. Todos los derechos reservados.
            </p>
          </div>

          {/* Links de Servicios */}
          <div>
            <h3 className="text-sm font-semibold text-white">Servicios</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/qa" className="text-sm text-gray-300 hover:text-white">Asistente IA</Link></li>
              <li><Link href="/pedidos" className="text-sm text-gray-300 hover:text-white">Contratos</Link></li>
              <li><Link href="/cursos" className="text-sm text-gray-300 hover:text-white">Cursos</Link></li>
              <li><Link href="/tienda" className="text-sm text-gray-300 hover:text-white">Biblioteca</Link></li>
              {/* (Puedes añadir 'Blog' si lo deciden) */}
              {/* <li><Link href="/blog" className="text-sm text-gray-300 hover:text-white">Blog</Link></li> */}
            </ul>
          </div>

          {/* Links Legales/Empresa */}
          <div>
            <h3 className="text-sm font-semibold text-white">Empresa</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li><Link href="/sobre-nosotros" className="text-sm text-gray-300 hover:text-white">Sobre Nosotros</Link></li>
              <li><Link href="/ayuda" className="text-sm text-gray-300 hover:text-white">Ayuda</Link></li>
              <li><Link href="/terminos-de-uso" className="text-sm text-gray-300 hover:text-white">Términos de Uso</Link></li>
              <li><Link href="/politica-privacidad" className="text-sm text-gray-300 hover:text-white">Política de Privacidad</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
