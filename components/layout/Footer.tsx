import  Link from 'next/link';
import { Scale } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-legal-navy to-legal-dark">
                <Scale className="h-6 w-6 text-legal-gold" />
              </div>
              <span className="text-xl font-bold">IntelliTax Lex</span>
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              Base de Conocimiento Tributario de la Dra. Nora Ruoti. 
              Plataforma profesional para consultas tributarias con tecnología de IA.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} IntelliTax Lex. Todos los derechos reservados.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#servicios" className="text-muted-foreground transition-colors hover:text-foreground">Asistente IA</Link></li>
              <li><Link href="/#servicios" className="text-muted-foreground transition-colors hover:text-foreground">Contratos</Link></li>
              <li><Link href="/#servicios" className="text-muted-foreground transition-colors hover:text-foreground">Cursos</Link></li>
              <li><Link href="/#servicios" className="text-muted-foreground transition-colors hover:text-foreground">Biblioteca</Link></li>
              <li><Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sobre-nosotros" className="text-muted-foreground transition-colors hover:text-foreground">Sobre Nosotros</Link></li>
              <li><Link href="/ayuda" className="text-muted-foreground transition-colors hover:text-foreground">Ayuda</Link></li>
              <li><Link href="/terminos" className="text-muted-foreground transition-colors hover:text-foreground">Términos de Uso</Link></li>
              <li><Link href="/privacidad" className="text-muted-foreground transition-colors hover:text-foreground">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;