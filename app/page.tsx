'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
// Importa tus componentes UI de tu carpeta @/components/ui/
import { Check, ArrowRight, X } from 'lucide-react'; 
import { Button } from '../@/components/ui/button';

// Importa los datos de productos que acabamos de definir
import { ALL_PRODUCTS, formatCurrency, Product } from '../types/products'; 

// Componente Placeholder para el Chat Demo (Tarea A-11)
const ChatboxDemo = () => (
  <div className="bg-slate-800 p-6 rounded-2xl h-full shadow-2xl shadow-slate-900/50 flex flex-col justify-between">
    <div className="space-y-4">
      <div className="text-sm bg-yellow-600/30 text-yellow-200 p-2 rounded-lg">
        <p>🤖 Pregunta a la IA (Demo Gratuita)</p>
      </div>
      <div className="bg-slate-700 text-white p-3 rounded-xl rounded-bl-none max-w-[80%]">
        <p className="text-sm">¿Cómo afecta la Ley N° XXX a la liquidación del IRP?</p>
      </div>
      <div className="bg-white text-slate-800 p-3 rounded-xl rounded-br-none max-w-[85%] ml-auto shadow-md">
        <p className="text-sm font-medium">La Ley N° XXX deroga el Art. 5 del Decreto 789/2020. [Fuente: LEY-XXX-2024]</p>
      </div>
    </div>
    <div className="mt-6">
      <input 
        type="text" 
        placeholder="Escribe tu consulta legal..." 
        className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:ring-yellow-500 focus:border-yellow-500" 
        disabled 
      />
      <p className="text-xs text-slate-400 mt-2">Funcionalidad limitada. Regístrate para acceso total.</p>
    </div>
  </div>
);


// ----------------------------------------------------
// Componente Principal de la Landing Page (Tarea A-9)
// ----------------------------------------------------
export default function LandingPage() {
  // Inicialmente seleccionamos el producto core (Agente IA)
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['suscripcion_ia']);

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) => {
      // Si es el producto core, no permitimos deseleccionarlo
      if (id === 'suscripcion_ia' && prev.includes(id) && prev.length > 1) {
          // Si es el core y hay otros seleccionados, solo deseleccionamos el core
          return prev.filter(p => p !== id);
      }
      if (id === 'suscripcion_ia' && !prev.includes(id)) {
          // Siempre incluimos el core si se vuelve a seleccionar
          return [...prev, id];
      }
      
      return prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
    });
  };

  // Calcula el total en base a los IDs seleccionados
  const total = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => selectedProducts.includes(p.id)).reduce(
      (sum, p) => sum + p.monthly_price,
      0
    );
  }, [selectedProducts]);

  // Genera el link de checkout con los productos seleccionados
  const checkoutLink = `/registro?products=${selectedProducts.join(',')}`;


  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      
      {/* --- HERO SECTION (A-9 Hybrid Design) --- */}
      <section className="relative pt-24 pb-20 md:pb-32 overflow-hidden border-b border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Columna Izquierda: Copywriting */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Domina la Tributación Paraguaya con <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Inteligencia Artificial.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg">
              Respuestas legales inmediatas, contratos blindados y gestión de Ekuatia'i simplificada. Todo validado por el equipo de expertos de **Nora Ruoti**.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#pricing" className="px-8 py-3 bg-yellow-500 text-slate-900 text-lg font-semibold rounded-xl hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2">
                Armar mi Plan Ahora <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="px-8 py-3 bg-slate-800 text-slate-200 border border-slate-700 text-lg font-semibold rounded-xl hover:bg-slate-700 transition">
                Iniciar Sesión
              </Link>
            </div>
          </div>
          
          {/* Columna Derecha: Chat Demo (Tarea A-11) */}
          <div className="h-96 md:h-[500px] relative">
            <div className="absolute inset-0">
              <ChatboxDemo />
            </div>
          </div>
        </div>
      </section>

      {/* --- PAIN POINTS & SOLUTIONS --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Soluciones especializadas para cada perfil</h2>
            <p className="text-slate-400">Diseñado para resolver los mayores dolores de contadores y abogados en Paraguay.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Componentes de Solución (Adaptado del diseño de Lovable) */}
            {ALL_PRODUCTS.map((product) => (
              <div key={product.id} className="p-6 rounded-xl bg-slate-800 border border-slate-700 space-y-4 hover:shadow-yellow-500/20 hover:shadow-lg transition duration-300">
                <div className="flex items-center gap-3">
                    {product.icon}
                    <h3 className="text-xl font-bold text-yellow-500">{product.name}</h3>
                </div>
                <p className="text-slate-400 text-sm">
                  {product.description}
                </p>
                <ul className="text-sm text-slate-300 space-y-1">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING BUILDER (TAREA A-9: Mix & Match) --- */}
      <section id="pricing" className="py-24 bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Arma tu Plan a Medida</h2>
            <p className="text-slate-400">Selecciona solo las herramientas que necesitas. Paga solo por lo que usas.</p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            
            {/* Columna de Selección Modular */}
            <div className="lg:col-span-2 space-y-6">
              {ALL_PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    selectedProducts.includes(product.id) 
                      ? 'border-yellow-500 bg-slate-700' 
                      : 'border-slate-700 bg-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                     selectedProducts.includes(product.id) ? 'bg-yellow-500 border-yellow-500' : 'border-slate-500'
                  }`}>
                    {selectedProducts.includes(product.id) && <Check className="w-4 h-4 text-slate-900" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                        {product.name}
                        {product.is_core && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">CORE</span>}
                      </h3>
                      <p className="font-bold text-2xl text-yellow-500">{formatCurrency(product.monthly_price)}</p>
                    </div>
                    <p className="text-slate-400 text-sm">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Columna de Resumen (Carrito Flotante) */}
            <div className="lg:col-span-1">
              <div className="bg-slate-700 rounded-2xl p-6 sticky top-24 shadow-2xl shadow-slate-900/50">
                <h3 className="text-xl font-bold mb-6 border-b border-slate-600 pb-4">Resumen de Compra</h3>
                
                <ul className="space-y-3 mb-6">
                  {selectedProducts.length === 0 ? (
                     <li className="text-slate-400">Elige al menos un servicio.</li>
                  ) : (
                    ALL_PRODUCTS.filter(p => selectedProducts.includes(p.id)).map(p => (
                      <li key={p.id} className="flex justify-between text-sm">
                        <span className="text-slate-300 flex items-center gap-2">{p.icon} {p.name}</span>
                        <span className="font-semibold text-white">{formatCurrency(p.monthly_price)}</span>
                      </li>
                    ))
                  )}
                </ul>

                <div className="border-t border-slate-600 pt-4">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-lg text-slate-300">Total Mensual</span>
                    <span className="text-4xl font-extrabold text-yellow-500">{formatCurrency(total)}</span>
                  </div>
                  
                  <Link 
                    href={selectedProducts.length > 0 ? checkoutLink : '#pricing'}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition ${
                      selectedProducts.length > 0 
                        ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400 shadow-lg shadow-yellow-500/25' 
                        : 'bg-slate-700 border border-slate-600 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedProducts.length > 0 ? 'Completar Registro' : 'Seleccionar Servicio'}
                  </Link>
                  <p className="text-xs text-center text-slate-400 mt-4">
                    Sin contratos forzosos. Cancelación inmediata.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-500 py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>(c) 2025 IntelliTax Lex. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}



