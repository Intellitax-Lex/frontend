import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Card, CardContent } from "../../../@/components/ui/card";
import { Shield, Lock, Eye, UserCheck, Database, Bell } from "lucide-react";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-muted-foreground text-lg">
              Plataforma IntelliTax Lex
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Última actualización: Noviembre 2025
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <p className="text-foreground/80 leading-relaxed">
                  Bienvenido a IntelliTax Lex. Su privacidad es fundamental para nosotros. 
                  Esta Política de Privacidad explica qué datos recopilamos, por qué los recopilamos, 
                  cómo los usamos y cómo los protegemos, en cumplimiento con la legislación paraguaya 
                  aplicable (ej. Ley N° 1682/01, Ley N° 6534/20).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
                    <p className="text-foreground/80 mb-4">
                      Recopilamos diferentes tipos de información para operar y proveer nuestros servicios:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Datos de Identificación y Registro</h3>
                        <p className="text-sm text-foreground/80">
                          Nombre completo, dirección de correo electrónico y contraseña (encriptada). 
                          Esta información es necesaria para crear y gestionar su cuenta.
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Datos de Pago y Suscripción</h3>
                        <p className="text-sm text-foreground/80">
                          Información sobre su plan de suscripción e historial de pagos. 
                          No almacenamos directamente los datos de su tarjeta de crédito; estos son procesados 
                          de forma segura por nuestros proveedores de pago certificados.
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Datos de Uso del Servicio</h3>
                        <p className="text-sm text-foreground/80">
                          Las preguntas que realiza a nuestro asistente de IA, historial de conversaciones, 
                          progreso en cursos, libros digitales adquiridos, contratos generados y facturas analizadas.
                        </p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Datos Técnicos</h3>
                        <p className="text-sm text-foreground/80">
                          Dirección IP, tipo de navegador, sistema operativo, y datos de acceso para 
                          mejorar la seguridad y el rendimiento de la plataforma.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">2. Cómo Usamos su Información</h2>
                    <p className="text-foreground/80 mb-4">
                      Utilizamos sus datos exclusivamente para los siguientes fines legítimos:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Proveer, mantener y mejorar nuestros servicios
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Personalizar su experiencia y las respuestas del asistente de IA
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Procesar transacciones y gestionar suscripciones
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Comunicarnos con usted sobre su cuenta, actualizaciones y cambios en el servicio
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Detectar, prevenir y abordar problemas técnicos o de seguridad
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Cumplir con obligaciones legales y regulatorias
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
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">3. Seguridad de sus Datos</h2>
                    <p className="text-foreground/80 mb-4">
                      La seguridad de sus datos personales es nuestra prioridad. Implementamos múltiples 
                      capas de seguridad:
                    </p>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Encriptación Avanzada</p>
                          <p className="text-sm text-foreground/70">
                            Todas las contraseñas están encriptadas con algoritmos de última generación. 
                            Las comunicaciones utilizan SSL/TLS.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Acceso Restringido</p>
                          <p className="text-sm text-foreground/70">
                            Solo personal autorizado tiene acceso a datos personales, 
                            bajo estrictos acuerdos de confidencialidad.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <Database className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Infraestructura Segura</p>
                          <p className="text-sm text-foreground/70">
                            Utilizamos servidores seguros y realizamos copias de seguridad regulares 
                            para proteger contra pérdida de datos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">4. Sus Derechos</h2>
                    <p className="text-foreground/80 mb-4">
                      Usted tiene los siguientes derechos sobre sus datos personales:
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Derecho de Acceso</h3>
                        <p className="text-sm text-foreground/80">
                          Puede solicitar una copia de todos los datos personales que tenemos sobre usted.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Derecho de Rectificación</h3>
                        <p className="text-sm text-foreground/80">
                          Puede corregir cualquier información inexacta o incompleta desde su perfil.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Derecho de Cancelación</h3>
                        <p className="text-sm text-foreground/80">
                          Puede solicitar la eliminación de sus datos personales, sujeto a obligaciones legales.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Derecho de Oposición</h3>
                        <p className="text-sm text-foreground/80">
                          Puede oponerse al procesamiento de sus datos en ciertas circunstancias.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-4">5. Compartir Información</h2>
                    <p className="text-foreground/80 mb-4">
                      No vendemos, alquilamos ni compartimos su información personal con terceros para 
                      fines de marketing. Podemos compartir datos solo en estos casos:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Con proveedores de servicios que nos ayudan a operar la plataforma (bajo acuerdos de confidencialidad)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Cuando sea requerido por ley o para proteger nuestros derechos legales
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground/80">
                          Con su consentimiento explícito
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">6. Cookies y Tecnologías Similares</h2>
                <p className="text-foreground/80 mb-4">
                  Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso 
                  de la plataforma y personalizar el contenido. Puede controlar el uso de cookies a través 
                  de la configuración de su navegador.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">7. Retención de Datos</h2>
                <p className="text-foreground/80 mb-4">
                  Retenemos sus datos personales solo durante el tiempo necesario para cumplir con los 
                  propósitos descritos en esta política, a menos que la ley requiera o permita un período 
                  de retención más largo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">8. Cambios a esta Política</h2>
                <p className="text-foreground/80 mb-4">
                  Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre 
                  cambios significativos publicando la nueva política en esta página y actualizando la 
                  fecha de "última actualización".
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
                <p className="text-foreground/80 mb-4">
                  Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, 
                  puede contactarnos a través de los canales de soporte disponibles en la plataforma.
                </p>
                <p className="text-foreground/80">
                  Nos comprometemos a responder a todas las consultas dentro de un plazo razonable y 
                  de acuerdo con la legislación aplicable.
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

export default Privacidad;