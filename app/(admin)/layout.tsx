// app/(admin)/layout.tsx
// Layout del SERVIDOR que envuelve todas las páginas de ADMIN.

import React from 'react';
// import { createClient as createServerClient } from '@/lib/supabase/server'; 
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '../../components/AdminSidebar'; // (Creamos este componente)

// Función para verificar si el usuario es Admin
async function getAdminUser(supabase) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  // ¡CRÍTICO! Ana debe implementar esta lógica.
  // Aquí, verificamos si el 'rol' del usuario (en sus metadatos) es 'admin'.
  if (session.user.user_metadata?.role === 'admin') {
     return session.user;
  }
  
  // Si no, verificamos en la tabla de Perfiles (si la crean)
  // const { data: profile } = await supabase
  //   .from('Profiles')
  //   .select('rol')
  //   .eq('user_id', session.user.id)
  //   .single();
  // if (profile?.rol === 'admin') {
  //   return session.user;
  // }

  return null; // No es un admin
}


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createServerClient();
  // const adminUser = await getAdminUser(supabase);
  const adminUser = null;

  // 1. Proteger la ruta:
  if (!adminUser) {
    // Si no es admin, lo saca al login
    redirect('/login');
  }

  return (
    // Fondo de admin, un gris/azul aún más oscuro
    <div className="flex h-screen bg-gray-900 text-gray-200">
      
      {/* Sidebar de Admin */}
      <AdminSidebar userEmail={adminUser.email} />

      {/* Área de Contenido Principal */}
      <main className="flex-1 overflow-y-auto bg-black/10">
        {children}
      </main>
    </div>
  );
}

