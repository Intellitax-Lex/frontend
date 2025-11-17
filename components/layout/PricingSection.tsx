import { Button } from "../../@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../@/components/ui/card";
import { Check } from "lucide-react";
import  Link from 'next/link';

const PricingSection = () => {
  const plans = [
    {
      name: "Personal",
      price: "Consultar",
      description: "Ideal para profesionales independientes",
      features: [
        "50 consultas IA por mes",
        "Acceso a base de conocimiento",
        "Soporte por email",
        "Historial de consultas",
      ],
    },
    {
      name: "Profesional",
      price: "Consultar",
      description: "Para estudios pequeños y medianos",
      features: [
        "200 consultas IA por mes",
        "Generación de contratos",
        "Análisis de facturas con IA",
        "Soporte prioritario",
        "Acceso a cursos básicos",
      ],
      popular: true,
    },
    {
      name: "Estudio",
      price: "Consultar",
      description: "Para estudios jurídicos y empresas",
      features: [
        "Consultas ilimitadas",
        "Todos los servicios incluidos",
        "Múltiples usuarios",
        "Soporte 24/7",
        "Acceso completo a cursos",
        "Biblioteca digital completa",
      ],
    },
  ];

  return (
    <section id="planes" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Planes y Precios</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Elija el plan que mejor se adapte a sus necesidades profesionales
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-legal-gold shadow-strong" : ""}>
              {plan.popular && (
                <div className="rounded-t-lg bg-legal-gold px-3 py-1 text-center text-sm font-medium text-legal-dark">
                  Más Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-legal-gold" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/registro" className="w-full">
                  <Button 
                    className={plan.popular ? "w-full bg-legal-gold text-legal-dark hover:bg-legal-gold/90" : "w-full"}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Comenzar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;