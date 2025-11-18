import { Brain, FileText, Zap, CheckCircle } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import  Link from 'next/link';

const SolutionSection = () => {
  const solutions = [
    {
      icon: Brain,
      title: "IA Jurídica Especializada",
      description: "Pregunta a nuestra IA entrenada con toda la legislación vigente",
      features: [
        "Leyes actualizadas",
        "Decretos y Resoluciones SET",
        "Jurisprudencia relevante",
        "Respuestas en segundos"
      ]
    },
    {
      icon: Zap,
      title: "Facturación Ekuatia'i",
      description: "Emite facturas en segundos sin entrar a Marangatu",
      features: [
        "Integración directa",
        "Validación automática",
        "Gestión simplificada",
        "Ahorra 80% de tiempo"
      ]
    },
    {
      icon: FileText,
      title: "Redacción Automática",
      description: "Genera contratos validados por expertos al instante",
      features: [
        "Plantillas profesionales",
        "Personalización inteligente",
        "Validación legal",
        "Exportación inmediata"
      ]
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">La Solución</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            IntelliTax Lex: Tu Asistente Contable Inteligente
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Automatiza tu trabajo diario y dedica más tiempo a lo que realmente importa: tus clientes
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="group relative rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-elegant hover:border-legal-gold/50"
            >
              <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-legal-gold/10 p-4">
                <solution.icon className="h-10 w-10 text-legal-gold" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-foreground">
                {solution.title}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {solution.description}
              </p>
              <ul className="space-y-3">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-legal-gold" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/registro">
            <Button size="lg" className="bg-legal-gold text-legal-dark hover:bg-legal-gold/90 font-semibold text-lg px-8 py-6">
              Comienza Gratis Ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;