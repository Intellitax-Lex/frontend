// components/HeaderPublico.tsx
'use client'; // Es un Client Component para manejar el menú móvil

import Link from 'next/link';
import { useState } from 'react';

export function HeaderPublico() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Fondo del header con transparencia y blur
    <header className="bg-blue-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-800">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-teal-400">IntelliTax Lex</span>
            {/* <img className="h-8 w-auto" src="/logo.png" alt="IntelliTax Lex" /> */}
          </Link>

          {/* Botón de Menú Móvil */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-300" // Icono de menú en azul claro
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
          </div>

          {/* Links de Navegación (Desktop) */}
          <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/precios" className="text-sm font-semibold leading-6 text-blue-300 hover:text-teal-400">
              Planes y Precios
            </Link>
            <Link href="/servicios" className="text-sm font-semibold leading-6 text-blue-300 hover:text-teal-400">
              Servicios
            </Link>
            <Link href="/cursos" className="text-sm font-semibold leading-6 text-blue-300 hover:text-teal-400">
              Cursos
            </Link>
            <Link href="/sobre-nosotros" className="text-sm font-semibold leading-6 text-blue-300 hover:text-teal-400">
              Sobre Nosotros
            </Link>
          </div>

          {/* Login/Registro (Desktop) */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link href="/login" className="text-sm font-semibold leading-6 text-blue-300 hover:text-teal-400">
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-md bg-teal-500 px-3.5 py-2 text-sm font-semibold text-blue-950 shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
            >
              Registrarse
            </Link>
          </div>
        </div>

        {/* --- Menú Móvil (Dialog) --- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            {/* Fondo del menú móvil */}
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-950 px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold text-teal-400">IntelliTax Lex</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-blue-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-blue-800/25">
                  <div className="space-y-2 py-6">
                    <Link href="/precios" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-300 hover:bg-blue-800">Planes</Link>
                    <Link href="/servicios" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-300 hover:bg-blue-800">Servicios</Link>
                    <Link href="/cursos" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-300 hover:bg-blue-800">Cursos</Link>
                    <Link href="/sobre-nosotros" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-300 hover:bg-blue-800">Sobre Nosotros</Link>
                  </div>
                  <div className="py-6">
                    <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-300 hover:bg-blue-800">Iniciar Sesión</Link>
                    <Link href="/registro" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-blue-950 bg-teal-500 hover:bg-teal-400">Registrarse</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}