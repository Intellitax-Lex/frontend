import Link from 'next/link';

export function FooterPublico() {
  return (
    <footer className="bg-blue-950 border-t border-blue-800 mt-12 py-8 text-center text-gray-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm leading-6">
          &copy; {new Date().getFullYear()} IntelliTax Lex. Todos los derechos reservados.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="/politica-privacidad" className="text-sm leading-6 hover:text-teal-400">
            Política de Privacidad
          </Link>
          <Link href="/terminos-servicio" className="text-sm leading-6 hover:text-teal-400">
            Términos de Servicio
          </Link>
        </div>
      </div>
    </footer>
  );
}