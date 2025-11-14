// app/(public)/login/page.tsx
// Esta página debe ser un Client Component para manejar el formulario.
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Asumimos que Ana crea un cliente Supabase en esta ruta
// import { createClient as createClientComponentClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const router = useRouter();
  // Usamos el cliente del navegador (client.ts)
  // const supabase = createClientComponentClient(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // const { error: signInError } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    const signInError = null;

    if (signInError) {
      setError('Credenciales inválidas. Por favor, intente de nuevo.');
      console.error(signInError.message);
      setIsLoading(false);
    } else {
      // Éxito. Redirigir al dashboard.
      // El router.refresh() es clave para que el Server Layout (app/layout)
      // detecte la nueva sesión y cargue los datos correctos.
      router.push('/dashboard'); // (O '/admin/dashboard' si detectamos rol)
      router.refresh(); 
      // No necesitamos setIsLoading(false) porque la página redirige.
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-teal-400">
          IntelliTax Lex
        </h2>
        <h3 className="mt-2 text-center text-xl font-medium text-white">
          Iniciar sesión en tu cuenta
        </h3>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Tarjeta de Formulario */}
        <div className="bg-blue-900 p-8 shadow-xl ring-1 ring-blue-700 sm:rounded-lg">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-200">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 bg-blue-800/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-blue-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Campo de Contraseña */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-200">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-teal-400 hover:text-teal-300">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-blue-800/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-blue-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="rounded-md bg-red-900/50 p-3 ring-1 ring-red-700">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-2.5 text-sm font-semibold leading-6 text-blue-950 shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Link a Registro */}
        <p className="mt-10 text-center text-sm text-blue-300">
          ¿No eres miembro?{' '}
          <Link href="/registro" className="font-semibold leading-6 text-teal-400 hover:text-teal-300">
            Regístrate ahora
          </Link>
        </p>
      </div>
    </div>
  );
}

