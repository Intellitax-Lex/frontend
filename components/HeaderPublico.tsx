// components/HeaderPublico.tsx
'use client'; // Necesario para el menú móvil

import Link from 'next/link';
import { useState } from 'react';
import { LayoutGrid, Menu, X } from 'lucide-react'; 
import type { Session } from '@supabase/supabase-js';

// Recibe la sesión desde el layout del servidor
interface HeaderProps {
  userSession: Session | null;
}

export function HeaderPublico({ userSession }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const userAbbreviation = userSession?.user?.email 
    ? userSession.user.email[0].toUpperCase() 
    : 'U';

  const navLinks = [
    { name: 'Asistente IA', href: '/qa' },
    { name: 'Contratos', href: '/pedidos' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Biblioteca', href: '/tienda' },
    { name: 'Facturas', href: '/facturas' },
  ];

  return (
    // Header con fondo oscuro (brand-dark)
    <header className="bg-brand-dark sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo e Izquierda */}
          <div className="flex items-center gap-x-12">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">IntelliTax Lex</span>
              {/* (Ana debe poner aquí el logo) */}
              <span className="text-xl font-bold text-white">IntelliTax Lex</span>
            </Link>
            {/* Links de Navegación (Desktop) */}
            <div className="hidden lg:flex lg:gap-x-8">
              {navLinks.map((item) => (
                <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links de Usuario (Desktop) - DINÁMICO */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {userSession ? (
              // -- VISTA LOGUEADO --
              <>
                <Link href="/dashboard" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </Link>
                {/* Avatar de Usuario */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-brand-dark text-sm font-semibold">
                  {userAbbreviation}
                </div>
              </>
            ) : (
              // -- VISTA DESLOGUEADO --
              <>
                <Link href="/login" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                  Acceder
                </Link>
                <Link
                  href="/registro"
                  className="rounded-md bg-brand-gold px-3.5 py-2 text-sm font-semibold text-brand-dark shadow-sm hover:bg-brand-gold-600"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Botón de Menú Móvil */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* --- Menú Móvil (Dialog) --- */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50" />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-brand-dark px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-white">IntelliTax Lex</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navLinks.map((item) => (
                      <Link key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {userSession ? (
                      <>
                        <Link href="/dashboard" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800">Dashboard</Link>
                        {/* (Aquí iría el botón de Logout) */}
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800">Acceder</Link>
                        <Link href="/registro" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-brand-gold text-brand-dark hover:bg-brand-gold-600">Registrarse</Link>
                      </>
                    )}
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
