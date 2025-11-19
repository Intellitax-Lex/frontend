// types/products.tsx
import React from 'react';

// Componentes de iconos
const AgentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-500">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/>
    <path d="M17 21v-8h4"/>
  </svg>
);

const ContractIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v6h6"/>
    <path d="M10 9H8"/>
    <path d="M16 13H8"/>
    <path d="M16 17H8"/>
  </svg>
);

const AcademyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);

export interface Product {
  id: string;
  name: string;
  description: string;
  monthly_price: number;
  features: string[];
  icon: React.ReactElement;
  is_core: boolean;
}

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'suscripcion_ia',
    name: 'Agente IA Tributario',
    description: 'Consultas ilimitadas con la KBase vigente y validada por expertos.',
    monthly_price: 150000,
    features: ['Respuestas en tiempo real', 'Filtro por Leyes/Resoluciones vigentes', 'Integración con Contratos'],
    icon: <AgentIcon />,
    is_core: true,
  },
  {
    id: 'contrato_generacion',
    name: 'Generador de Contratos',
    description: 'Redacción automática de documentos legales, revisados por el Estudio de Nora Ruoti.',
    monthly_price: 200000,
    features: ['Contratos listos para firmar', 'Edición guiada', 'Descarga en PDF/Word'],
    icon: <ContractIcon />,
    is_core: false,
  },
  {
    id: 'academia_acceso',
    name: 'Acceso a la Academia',
    description: 'Cursos en video, biblioteca digital y webinars exclusivos para formación continua.',
    monthly_price: 100000,
    features: ['Cursos de Liquidación y Novedades', 'Biblioteca completa', 'Certificación de módulos'],
    icon: <AcademyIcon />,
    is_core: false,
  },
];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('es-PY', { 
    style: 'currency', 
    currency: 'PYG', 
    maximumFractionDigits: 0 
  }).format(amount);