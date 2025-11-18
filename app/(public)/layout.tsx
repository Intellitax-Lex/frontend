// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // (O la fuente que elijan)
import "../globals.css"; // Importa los estilos de Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntelliTax Lex",
  description: "IA Legal y Tributaria powered by Nora Ruoti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-brand-gray-100`}>{children}</body>
    </html>
  );
}
