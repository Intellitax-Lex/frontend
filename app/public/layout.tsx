// app/(public)/layout.tsx
// Este es el layout principal para TODA la aplicación.
import React from 'react';
import { HeaderPublico } from '../../components/HeaderPublico';
import { FooterPublico } from '../../components/FooterPublico';
// import { createClient as createServerClient } from '@/lib/supabase/server'; 
import { cookies } from 'next/headers';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createServerClient();
  const supabase = null;
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Pasamos la sesión al Header para que sepa si mostrar "Login" o "Dashboard" */}
      <HeaderPublico userSession={session} />
      <main className="flex-grow">{children}</main>
      <FooterPublico />
    </div>
  );
}
