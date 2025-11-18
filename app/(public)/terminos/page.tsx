import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Card, CardContent } from "../../../@/components/ui/card";
import { FileText, Shield, AlertCircle, Scale, CheckCircle } from "lucide-react";

const Terminos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Términos de Uso</h1>
            <p className="text-muted-foreground text-lg">
              Plataforma IntelliTax Lex
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Última actualización: Noviembre 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">1. Naturaleza del Servicio</h2>
                    <p className="text-foreground/80 mb-4">
                      La plataforma IntelliTax Lex utiliza tecnologías de Inteligencia Artificial (modelos LLM y búsqueda vectorial) 
                      para facilitar el acceso y la búsqueda dentro de la Base de Conocimiento tributario. El usuario 
                      reconoce y acepta que:
                    </p>
                    <ul className="space-y-3 ml-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Las respuestas generadas son informativas y orientativas, basadas en la legislación cargada en el sistema 
                          hasta la fecha de la última actualización.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          El uso de la plataforma no constituye una relación abogado-cliente ni reemplaza el dictamen profesional 
                          personalizado de un experto tributario.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Los administradores no se hacen responsables por decisiones comerciales, tributarias o legales 
                          tomadas exclusivamente con base en las respuestas automáticas del sistema.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">2. Vigencia de las Normas</h2>
                    <p className="text-foreground/80 mb-4">
                      Aunque el sistema cuenta con procesos de verificación diaria de nuevas normativas (Leyes, Decretos y Resoluciones), 
                      existe un margen de tiempo técnico entre la promulgación de una norma y su indexación en nuestra 
                      Base de Datos.
                    </p>
                    <p className="text-foreground/80">
                      El sistema está diseñado para priorizar documentos con estado "Vigente", pero es responsabilidad 
                      del usuario profesional corroborar la vigencia final en fuentes oficiales para casos críticos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">3. Uso Aceptable</h2>
                    <p className="text-foreground/80 mb-4">
                      Al utilizar IntelliTax Lex, usted se compromete a:
                    </p>
                    <ul className="space-y-3 ml-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Utilizar la plataforma de manera legal y ética
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          No compartir sus credenciales de acceso con terceros
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          Respetar los derechos de propiedad intelectual del contenido
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">
                          No intentar comprometer la seguridad o integridad del sistema
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">4. Propiedad Intelectual</h2>
                <p className="text-foreground/80 mb-4">
                  Todo el contenido, diseño, logos, marcas, y material educativo disponible en IntelliTax Lex 
                  están protegidos por derechos de autor y otras leyes de propiedad intelectual.
                </p>
                <p className="text-foreground/80">
                  El usuario obtiene una licencia limitada, no exclusiva y no transferible para acceder y 
                  utilizar el contenido únicamente para fines personales o profesionales directos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">5. Limitación de Responsabilidad</h2>
                <p className="text-foreground/80 mb-4">
                  IntelliTax Lex se proporciona "tal cual" y "según disponibilidad". No garantizamos que el servicio 
                  será ininterrumpido, seguro o libre de errores.
                </p>
                <p className="text-foreground/80">
                  En ningún caso seremos responsables por daños indirectos, incidentales, especiales, consecuentes 
                  o punitivos derivados del uso o la imposibilidad de uso de la plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">6. Modificaciones</h2>
                <p className="text-foreground/80 mb-4">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
                  en vigor inmediatamente después de su publicación en la plataforma.
                </p>
                <p className="text-foreground/80">
                  Es responsabilidad del usuario revisar periódicamente estos términos. El uso continuado de 
                  la plataforma después de los cambios constituye la aceptación de los nuevos términos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
                <p className="text-foreground/80">
                  Si tiene preguntas sobre estos Términos de Uso, puede contactarnos a través de los 
                  canales de soporte disponibles en la plataforma.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terminos;