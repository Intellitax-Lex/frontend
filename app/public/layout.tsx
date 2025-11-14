// app/(public)/layout.tsx
// Este layout envuelve todas las páginas públicas (Home, Precios, Login, etc.)

import React from 'react';
// (Asegúrate de crear estos dos componentes en las siguientes rutas)
import { HeaderPublico } from '../../components/HeaderPublico';
import { FooterPublico } from '../../components/FooterPublico';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Fondo azul oscuro principal, altura mínima de pantalla
    <div className="flex min-h-screen flex-col bg-blue-950 text-white">
      <HeaderPublico />
      <main className="flex-grow">{children}</main>
      <FooterPublico />
    </div>
  );
}