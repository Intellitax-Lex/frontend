// components/AppSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
// (Instalar: npm install lucide-react)
import { 
  Home, 
  MessageSquare, 
  FileText, 
  FileStack, 
  CreditCard, 
  BookOpen, 
  LogOut,
  ChevronDown,
  ShoppingBag // Para Libros
} from 'lucide-react';

interface AppSidebarProps {
  userEmail?: string;
}

// Datos de Navegación del Cliente
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Q&A (Chat)', href: '/qa', icon: MessageSquare },
  { name: 'Pedidos (Contratos)', href: '/pedidos', icon: FileText },
  { name: 'Analizar Facturas', href: '/facturas', icon: FileStack },
  { name: 'Cursos (LMS)', href: '/cursos', icon: BookOpen },
  { name: 'Tienda (Libros)', href: '/tienda', icon: ShoppingBag },
  { name: 'Suscripción', href: '/suscripcion', icon: CreditCard },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function AppSidebar({ userEmail }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col gap-y-5 overflow-y-auto bg-blue-950 p-6 border-r border-blue-800">
      
      {/* 1. Logo */}
      <div className="flex h-16 shrink-0 items-center">
        <Link href="/dashboard">
          <span className="text-2xl font-bold text-teal-400">IntelliTax Lex</span>
        </Link>
      </div>

      {/* 2. Navegación */}
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    // className={classNames(
                    //   pathname.startsWith(item.href),
                    //     ? 'bg-blue-800 text-white'
                    //     : 'text-blue-300 hover:text-white hover:bg-blue-800/50'
                    //   'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    // )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* 3. Menú de Usuario (al final) */}
          <li className="mt-auto">
            <Menu as="div" className="relative">
              <Menu.Button className="w-full flex items-center gap-x-4 px-3 py-3 text-sm font-semibold leading-6 text-blue-200 hover:bg-blue-800/50 rounded-md">
                <span className="sr-only">Abrir menú de usuario</span>
                {/* Placeholder de Avatar */}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-800 text-teal-300">
                  {userEmail ? userEmail[0].toUpperCase() : 'U'}
                </span>
                <span className="flex-1 text-left truncate">{userEmail ?? 'Usuario'}</span>
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute bottom-12 mb-2 w-56 origin-bottom-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      // Este 'form' es para el 'SignOut' de Server Action de Supabase
                      <form action="/auth/signout" method="post">
                        <button
                          type="submit"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'flex w-full px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          Cerrar Sesión
                        </button>
                      </form>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        </ul>
      </nav>
    </aside>
  );
}