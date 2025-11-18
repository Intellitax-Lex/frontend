import { AlertCircle, FileSearch, Clock, Ban } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: FileSearch,
      title: "¿Cansado de buscar en cientos de PDFs de la SET?",
      description: "Pierdes tiempo valioso navegando documentos extensos para encontrar una simple respuesta."
    },
    {
      icon: Clock,
      title: "¿Pierdes horas redactando contratos repetitivos?",
      description: "Cada contrato te toma horas cuando podrías estar atendiendo más clientes."
    },
    {
      icon: Ban,
      title: "¿El sistema Marangatu es lento y complicado?",
      description: "La facturación electrónica no debería ser un dolor de cabeza diario."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">El Problema</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Sabemos que tu tiempo vale oro
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Como contador o estudio contable, enfrentas estos desafíos todos los días
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group relative rounded-lg border bg-card p-8 shadow-sm transition-all hover:shadow-elegant hover:border-destructive/30"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-destructive/10 p-3">
                <problem.icon className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {problem.title}
              </h3>
              <p className="text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;