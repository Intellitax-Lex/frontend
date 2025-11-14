// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IntelliTax Lex',
  description: 'IA Legal y Tributaria powered by Nora Ruoti',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-blue-950`}>
        {children}
      </body>
    </html>
  )
}
