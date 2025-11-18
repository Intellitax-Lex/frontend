import { Shield, Star, Users, TrendingUp } from "lucide-react";

const SocialProofSection = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Contadores confiando en nosotros"
    },
    {
      icon: TrendingUp,
      value: "10,000+",
      label: "Consultas procesadas al mes"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Calificación promedio"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-legal-gold/10 border border-legal-gold/20">
            <Shield className="h-5 w-5 text-legal-gold" />
            <span className="text-sm font-medium text-legal-gold">Confianza y Resultados</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Validado por Profesionales
          </h2>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-card border shadow-sm"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto rounded-lg border-2 border-legal-gold/30 bg-card p-8 shadow-elegant">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-legal-gold/20 flex items-center justify-center">
                <Shield className="h-8 w-8 text-legal-gold" />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground mb-2">
                Validado por el estudio de Nora Ruoti
              </p>
              <p className="text-muted-foreground mb-4">
                "IntelliTax Lex ha transformado la manera en que manejamos consultas tributarias. 
                Lo que antes tomaba horas, ahora se resuelve en minutos con precisión impecable."
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-legal-gold text-legal-gold" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-6">Empresas y estudios que confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="h-16 w-32 rounded-lg bg-muted/50 border flex items-center justify-center"
              >
                <p className="text-xs text-muted-foreground">Logo {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;