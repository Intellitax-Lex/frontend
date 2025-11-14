// app/(app)/layout.tsx
// Layout del SERVIDOR que envuelve todas las páginas privadas.

import React from 'react';
// (Necesitamos crear el cliente 'server' en lib/supabase/server.ts)
// import { createClient as createServerClient } from '@/lib/supabase/server'; 
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppSidebar } from '../../components/AppSidebar'; // (Creamos este componente)

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const supabase = createServerClient();
  const supabase = null

  // 1. Proteger la ruta: Obtener la sesión del usuario
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 2. Si no hay sesión, redirigir al login
  if (!session) {
    redirect('/login');
  }

  return (
    // Fondo azul oscuro principal para la app
    <div className="flex h-screen bg-blue-950 text-gray-200">
      
      {/* Sidebar (Menú de Navegación) */}
      <AppSidebar userEmail={session.user.email} />

      {/* Área de Contenido Principal (con un leve fondo más claro) */}
      <main className="flex-1 overflow-y-auto bg-black/10">
        {/* 'children' será la página específica (ej. Dashboard, Q&A, etc.) */}
        {children}
      </main>
    </div>
  );
}

