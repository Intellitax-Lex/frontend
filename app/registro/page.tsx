// app/(public)/registro/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { createClient as createClientComponentClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

// Definimos el tipo de Plan para TypeScript (del ENUM de la DB)
type Plan = 'personal' | 'profesional' | 'estudio';

export default function RegistroPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estado para el plan seleccionado. 'personal' por defecto.
  const [plan, setPlan] = useState<Plan>('personal'); 
  const [orgName, setOrgName] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const supabase = createClientComponentClient();

  // ESTA ES LA FUNCIÓN CLAVE QUE LLAMA AL TRIGGER 1
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // --- Validaciones del Front-End ---
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }
    if (plan !== 'personal' && !orgName) {
      setError("Por favor, ingrese el nombre de su organización.");
      setIsLoading(false);
      return;
    }
    if (!agreedToPolicy) {
      setError("Debe aceptar la Política de Privacidad para continuar.");
      setIsLoading(false);
      return;
    }

    // --- ¡LA LÓGICA DEL TRIGGER! ---
    // Preparamos el objeto 'options.data' que leerá el Trigger
    // 'handle_new_user' en la base de datos.
    const options = {
      data: {
        plan: plan,
        // Solo enviamos 'org_name' si el plan no es 'personal'
        org_name: plan !== 'personal' ? orgName : undefined, 
        // (Ana podría añadir un 'full_name' aquí si lo pide en el form)
      }
    };

    // --- Llamada a Supabase Auth ---
    // const { error: signUpError } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options, // <-- Aquí pasamos los metadatos
    // });

    const signUpError = null;

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
    } else {
      // Éxito. Redirigimos al usuario al dashboard.
      // (Supabase puede requerir verificación de email, pero el Trigger 1
      // YA creó la suscripción en la DB).
      router.push('/dashboard'); // Redirige a la app
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-teal-400">
          IntelliTax Lex
        </h2>
        <h3 className="mt-2 text-center text-xl font-medium text-white">
          Crea tu cuenta nueva
        </h3>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-blue-900 p-8 shadow-xl ring-1 ring-blue-700 sm:rounded-lg">
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-200">Email</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 bg-blue-800/50 py-2.5 text-white ring-1 ring-inset ring-blue-700 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Campo de Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-200">Contraseña (mínimo 6 caracteres)</label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-blue-800/50 py-2.5 text-white ring-1 ring-inset ring-blue-700 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Campo de Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-blue-200">Confirmar Contraseña</label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-blue-800/50 py-2.5 text-white ring-1 ring-inset ring-blue-700 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Selección de Plan */}
            <fieldset className="mt-4">
              <legend className="block text-sm font-medium leading-6 text-blue-200">Selecciona tu Plan</legend>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {/* Opción Personal */}
                <label 
                  className={`flex cursor-pointer rounded-lg border p-4 ${plan === 'personal' ? 'bg-teal-900 border-teal-500 ring-2 ring-teal-500' : 'bg-blue-800/50 border-blue-700 hover:bg-blue-800'}`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="personal"
                    checked={plan === 'personal'}
                    onChange={() => setPlan('personal')}
                    className="h-4 w-4 mt-0.5 text-teal-600 focus:ring-teal-500 border-gray-500"
                  />
                  <span className="ml-3 block text-sm font-medium text-white">Plan Personal</span>
                </label>
                {/* Opción B2B */}
                <label 
                  className={`flex cursor-pointer rounded-lg border p-4 ${plan !== 'personal' ? 'bg-teal-900 border-teal-500 ring-2 ring-teal-500' : 'bg-blue-800/50 border-blue-700 hover:bg-blue-800'}`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="profesional" // 'profesional' o 'estudio' se manejan igual
                    checked={plan !== 'personal'}
                    onChange={() => setPlan('profesional')} // Asumimos B2B
                    className="h-4 w-4 mt-0.5 text-teal-600 focus:ring-teal-500 border-gray-500"
                  />
                  <span className="ml-3 block text-sm font-medium text-white">Profesional / Estudio</span>
                </label>
              </div>
            </fieldset>

            {/* Campo Condicional: Nombre de Organización */}
            {plan !== 'personal' && (
              <div> {/* (Ana puede añadir una animación simple aquí) */}
                <label htmlFor="orgName" className="block text-sm font-medium leading-6 text-blue-200">
                  Nombre de tu Estudio / Organización
                </label>
                <div className="mt-2">
                  <input
                    id="orgName"
                    name="orgName"
                    type="text"
                    // required={plan !== 'personal'}
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="block w-full rounded-md border-0 bg-blue-800/50 py-2.5 text-white ring-1 ring-inset ring-blue-700 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Checkbox de Política de Privacidad (BLOQUEADO HASTA TAREA N-1) */}
            <div className="flex items-center space-x-3">
              <input
                id="policy"
                name="policy"
                type="checkbox"
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                className="h-4 w-4 rounded bg-blue-800 border-blue-700 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="policy" className="text-sm leading-6 text-blue-300">
                Acepto la <a href="/politica-privacidad" target="_blank" className="font-semibold text-teal-400 hover:text-teal-300">Política de Privacidad</a>
              </label>
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
                disabled={isLoading || !agreedToPolicy} // Deshabilitado si está cargando o no aceptó
                className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-2.5 text-sm font-semibold leading-6 text-blue-950 shadow-sm hover:bg-teal-400 focus-visible:outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </div>
          </form>

          {/* Link a Login */}
          <p className="mt-10 text-center text-sm text-blue-300">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-semibold leading-6 text-teal-400 hover:text-teal-300">
              Inicia Sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

