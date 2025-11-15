'use client'
// app/(auth)/layout.tsx
import React from 'react';
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
// import { createClient as createServerClient } from '@/lib/supabase/server'; 
import { cookies } from 'next/headers';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createServerClient();
  const supabase = null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
            {children}
        </main>
      <Footer />
    </div>
  );
}
