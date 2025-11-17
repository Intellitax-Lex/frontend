import { Button } from "../../@/components/ui/button";
import  Link from 'next/link';
import { Bot, FileText, GraduationCap, Library } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-legal-navy via-legal-dark to-legal-navy py-24 lg:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bS00IDB2Mmgydi0yaC0yem0tNCAwdjJoMnYtMmgtMnptLTQgMHYyaDJ2LTJoLTJ6bS00IDB2Mmgydi0yaC0yem0tNCAwdjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-legal-gold/10 px-4 py-2 text-sm font-medium text-legal-gold">
            <Bot className="h-4 w-4" />
            Impulsado por Inteligencia Artificial
          </div>
          
          <h1 className="mb-6 text-4xl font-bold text-white lg:text-6xl">
            IntelliTax Lex
          </h1>
          
          <p className="mb-4 text-xl text-white/90 lg:text-2xl">
            Base de Conocimiento Tributario de la Dra. Nora Ruoti
          </p>
          
          <p className="mb-10 text-lg text-white/70 lg:text-xl">
            Acceda a legislación tributaria paraguaya actualizada con la potencia de la IA. 
            Consultas instantáneas, contratos automatizados y formación profesional continua.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/registro">
              <Button size="lg" className="bg-legal-gold text-legal-dark hover:bg-legal-gold/90 shadow-lg transition-all duration-300 hover:scale-105">
                Comenzar Ahora
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            icon={<Bot className="h-8 w-8" />}
            title="Asistente IA"
            description="Consultas tributarias instantáneas con respuestas basadas en legislación vigente"
          />
          <ServiceCard
            icon={<FileText className="h-8 w-8" />}
            title="Contratos"
            description="Generación automática de documentos legales validados por profesionales"
          />
          <ServiceCard
            icon={<GraduationCap className="h-8 w-8" />}
            title="Cursos"
            description="Formación continua en derecho tributario paraguayo"
          />
          <ServiceCard
            icon={<Library className="h-8 w-8" />}
            title="Biblioteca"
            description="Acceso a libros digitales y recursos especializados"
          />
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="group rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-legal-gold/30 hover:bg-white/10">
      <div className="mb-4 inline-flex rounded-lg bg-legal-gold/10 p-3 text-legal-gold transition-colors duration-300 group-hover:bg-legal-gold/20">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
};

export default HeroSection;