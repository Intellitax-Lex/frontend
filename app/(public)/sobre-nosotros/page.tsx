import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Card, CardContent } from "../../../@/components/ui/card";
import { Badge } from "../../../@/components/ui/badge";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  BookOpen,
  Shield,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Scale,
} from "lucide-react";

const SobreNosotros = () => {
  const valores = [
    {
      icon: Shield,
      title: "Confiabilidad",
      description:
        "Información tributaria precisa y actualizada diariamente desde fuentes oficiales.",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description:
        "Tecnología de IA de vanguardia para facilitar el acceso al conocimiento tributario.",
    },
    {
      icon: Heart,
      title: "Compromiso",
      description:
        "Dedicados a simplificar y democratizar el acceso a la información legal tributaria.",
    },
    {
      icon: Users,
      title: "Excelencia",
      description:
        "Contenido curado por expertos en materia tributaria paraguaya.",
    },
    {
      icon: BookOpen,
      title: "Educación",
      description:
        "Formación continua a través de cursos especializados y biblioteca digital.",
    },
    {
      icon: TrendingUp,
      title: "Mejora Continua",
      description:
        "Evolución constante basada en las necesidades de nuestros usuarios.",
    },
  ];

  const equipo = [
    {
      name: "Dra. Nora Ruoti",
      role: "Experta en Derecho Tributario",
      description:
        "Especialista en legislación tributaria paraguaya con amplia trayectoria profesional.",
      icon: Scale,
    },
    {
      name: "Equipo de Desarrollo",
      role: "Tecnología e Innovación",
      description:
        "Ingenieros especializados en IA y desarrollo de plataformas educativas.",
      icon: Lightbulb,
    },
    {
      name: "Equipo Legal",
      role: "Contenido Jurídico",
      description:
        "Abogados especializados en actualización y curación de contenido legislativo.",
      icon: BookOpen,
    },
  ];

  const hitos = [
    {
      year: "2024",
      title: "Lanzamiento de la Plataforma",
      description:
        "Inicio de operaciones con base de conocimiento tributario completa",
    },
    {
      year: "2024",
      title: "Integración de IA Avanzada",
      description:
        "Implementación de asistente inteligente con búsqueda vectorial",
    },
    {
      year: "2025",
      title: "Expansión de Servicios",
      description:
        "Incorporación de cursos, biblioteca digital y generación de contratos",
    },
    {
      year: "Futuro",
      title: "Innovación Continua",
      description: "Desarrollo de nuevas funcionalidades y expansión regional",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="secondary">
                <Sparkles className="h-3 w-3 mr-1" />
                Sobre Nosotros
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                IntelliTax Lex
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transformando el acceso al conocimiento tributario mediante la
                combinación de expertise legal y tecnología de inteligencia
                artificial
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="border-primary/20">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">Nuestra Misión</h2>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    Democratizar el acceso a la información tributaria en
                    Paraguay, proporcionando herramientas tecnológicas avanzadas
                    que simplifiquen la comprensión y aplicación de la
                    legislación fiscal para profesionales y empresas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">Nuestra Visión</h2>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    Ser la plataforma líder en América Latina para consultoría
                    tributaria inteligente, reconocida por la precisión de
                    nuestra información y la innovación en la aplicación de
                    inteligencia artificial al derecho tributario.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Nuestros Valores</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Los principios que guían cada decisión y acción en IntelliTax
                  Lex
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {valores.map((valor, index) => {
                  const Icon = valor.icon;
                  return (
                    <Card
                      key={index}
                      className="group hover:shadow-lg transition-all hover:border-primary/30"
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold mb-3">
                            {valor.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed">
                            {valor.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Qué nos hace diferentes */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  ¿Qué nos hace diferentes?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Combinamos lo mejor de dos mundos: experiencia legal y
                  tecnología de punta
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Award className="h-6 w-6 text-primary" />
                      Tecnología de Vanguardia
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Asistente de IA entrenado específicamente en
                          legislación tributaria paraguaya
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Búsqueda vectorial semántica para encontrar
                          información relevante instantáneamente
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Actualización diaria automática de normativas desde
                          fuentes oficiales
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Generación automatizada de contratos y análisis de
                          facturas
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                      <Scale className="h-6 w-6 text-primary" />
                      Expertise Legal
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Contenido curado y validado por expertos en derecho
                          tributario
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Cursos especializados diseñados por profesionales del
                          área
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Biblioteca digital con literatura tributaria
                          seleccionada
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Base de conocimiento fundamentada en jurisprudencia y
                          doctrina
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Nuestro Equipo</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Profesionales comprometidos con la excelencia y la innovación
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {equipo.map((miembro, index) => {
                  const Icon = miembro.icon;
                  return (
                    <Card
                      key={index}
                      className="text-center hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="pt-8">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {miembro.name}
                        </h3>
                        <p className="text-primary font-medium mb-3">
                          {miembro.role}
                        </p>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {miembro.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline/Hitos */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Nuestra Trayectoria</h2>
                <p className="text-muted-foreground text-lg">
                  El camino hacia la transformación digital del derecho
                  tributario
                </p>
              </div>

              <div className="space-y-6">
                {hitos.map((hito, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/50" />
                    <CardContent className="pt-6 pl-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Badge
                          variant="secondary"
                          className="w-fit text-lg px-4 py-1"
                        >
                          {hito.year}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            {hito.title}
                          </h3>
                          <p className="text-foreground/70">
                            {hito.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  ¿Listo para optimizar tu gestión tributaria?
                </h2>
                <p className="text-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                  Únete a los profesionales que ya confían en IntelliTax Lex
                  para simplificar su trabajo tributario diario
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/registro"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Comenzar Ahora
                  </a>
                  <a
                    href="/cursos"
                    className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    Explorar Cursos
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default SobreNosotros;
