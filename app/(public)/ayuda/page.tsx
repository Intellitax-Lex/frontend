'use client'
import { useState } from "react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Input } from "../../../@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Search, BookOpen, CreditCard, Users, Shield, FileText, HelpCircle } from "lucide-react";

const Ayuda = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      id: "general",
      title: "General",
      icon: HelpCircle,
      faqs: [
        {
          question: "¿Qué es IntelliTax Lex?",
          answer: "IntelliTax Lex es una plataforma integral de formación en legislación tributaria que combina cursos interactivos, una biblioteca jurídica especializada y asistencia de IA para ayudar a profesionales y estudiantes a dominar el ámbito fiscal."
        },
        {
          question: "¿Cómo puedo registrarme?",
          answer: "Puedes registrarte haciendo clic en el botón 'Registrarse' en la parte superior de la página. Solo necesitas proporcionar tu correo electrónico y crear una contraseña segura."
        },
        {
          question: "¿Necesito conocimientos previos?",
          answer: "No necesariamente. Ofrecemos cursos para todos los niveles, desde principiantes hasta expertos. Cada curso indica su nivel de dificultad para que puedas elegir el más adecuado para ti."
        },
        {
          question: "¿Cómo funciona el asistente de IA?",
          answer: "Nuestro asistente de IA está disponible 24/7 para responder tus preguntas sobre legislación tributaria. Puedes acceder desde el menú 'Chat' y hacer consultas en lenguaje natural sobre normativas, casos prácticos y más."
        }
      ]
    },
    {
      id: "cursos",
      title: "Cursos",
      icon: BookOpen,
      faqs: [
        {
          question: "¿Cómo accedo a los cursos?",
          answer: "Una vez registrado, ve a la sección 'Cursos' desde el menú principal. Allí encontrarás todos los cursos disponibles. Puedes inscribirte en los que te interesen y comenzar de inmediato."
        },
        {
          question: "¿Los cursos tienen certificado?",
          answer: "Sí, al completar el 100% de un curso, recibirás automáticamente un certificado digital con código de verificación que puedes descargar desde tu perfil o la sección 'Certificados'."
        },
        {
          question: "¿Puedo ver mi progreso en los cursos?",
          answer: "Sí, en tu Dashboard personal puedes ver el progreso de todos tus cursos activos, incluyendo el porcentaje completado y las lecciones pendientes."
        },
        {
          question: "¿Los cursos tienen fecha límite?",
          answer: "No, una vez inscrito en un curso, tienes acceso ilimitado. Puedes avanzar a tu propio ritmo sin presiones de tiempo."
        },
        {
          question: "¿Puedo descargar el material del curso?",
          answer: "Sí, muchos cursos incluyen material descargable como PDFs, presentaciones y documentos de referencia que puedes guardar para consultar offline."
        }
      ]
    },
    {
      id: "biblioteca",
      title: "Biblioteca",
      icon: FileText,
      faqs: [
        {
          question: "¿Qué contiene la biblioteca?",
          answer: "La biblioteca contiene documentos jurídicos especializados en legislación tributaria, incluyendo leyes, reglamentos, jurisprudencia, doctrina y casos prácticos actualizados."
        },
        {
          question: "¿Puedo descargar los documentos?",
          answer: "Sí, todos los documentos de la biblioteca están disponibles para descarga en formato PDF. También puedes leerlos online con nuestro visor integrado."
        },
        {
          question: "¿Con qué frecuencia se actualiza?",
          answer: "Actualizamos la biblioteca constantemente, agregando nuevos documentos y actualizando los existentes cuando hay cambios en la legislación tributaria."
        },
        {
          question: "¿Puedo sugerir documentos?",
          answer: "Sí, valoramos tus sugerencias. Puedes contactarnos a través del formulario de contacto para proponer documentos que te gustaría ver en la biblioteca."
        }
      ]
    },
    {
      id: "pagos",
      title: "Pagos y Suscripciones",
      icon: CreditCard,
      faqs: [
        {
          question: "¿Qué planes de suscripción ofrecen?",
          answer: "Ofrecemos varios planes adaptados a diferentes necesidades: Plan Básico con acceso a cursos fundamentales, Plan Profesional con toda la biblioteca y asistencia IA ilimitada, y Plan Premium con certificaciones y asesoría personalizada."
        },
        {
          question: "¿Puedo cancelar mi suscripción?",
          answer: "Sí, puedes cancelar tu suscripción en cualquier momento desde tu perfil. Mantendrás acceso hasta el final del período ya pagado."
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias y otros métodos de pago locales según tu región."
        },
        {
          question: "¿Ofrecen reembolsos?",
          answer: "Sí, ofrecemos una garantía de satisfacción de 14 días. Si no estás satisfecho, puedes solicitar un reembolso completo dentro de este período."
        },
        {
          question: "¿Hay descuentos para estudiantes?",
          answer: "Sí, ofrecemos descuentos especiales para estudiantes. Contacta con nuestro equipo de soporte con tu credencial de estudiante para más información."
        }
      ]
    },
    {
      id: "cuenta",
      title: "Cuenta y Perfil",
      icon: Users,
      faqs: [
        {
          question: "¿Cómo actualizo mi información personal?",
          answer: "Ve a la sección 'Perfil' desde el menú principal. Allí podrás editar tu nombre, correo electrónico, contraseña y otra información personal."
        },
        {
          question: "¿Olvidé mi contraseña, qué hago?",
          answer: "En la página de inicio de sesión, haz clic en '¿Olvidaste tu contraseña?'. Te enviaremos un correo con instrucciones para restablecerla."
        },
        {
          question: "¿Puedo cambiar mi correo electrónico?",
          answer: "Sí, desde tu perfil puedes actualizar tu correo electrónico. Recibirás un correo de confirmación en la nueva dirección antes de que el cambio sea efectivo."
        },
        {
          question: "¿Cómo elimino mi cuenta?",
          answer: "Si deseas eliminar tu cuenta, contacta con nuestro equipo de soporte. Ten en cuenta que esta acción es irreversible y perderás acceso a todos tus cursos y certificados."
        }
      ]
    },
    {
      id: "seguridad",
      title: "Seguridad y Privacidad",
      icon: Shield,
      faqs: [
        {
          question: "¿Mis datos están seguros?",
          answer: "Sí, utilizamos encriptación de grado bancario para proteger toda tu información personal y financiera. Cumplimos con las normativas GDPR y otras regulaciones de protección de datos."
        },
        {
          question: "¿Comparten mi información con terceros?",
          answer: "No vendemos ni compartimos tu información personal con terceros sin tu consentimiento. Solo compartimos datos necesarios con procesadores de pago seguros."
        },
        {
          question: "¿Puedo ver qué datos tienen de mí?",
          answer: "Sí, tienes derecho a acceder a todos tus datos. Puedes solicitarlo desde tu perfil o contactando con nuestro equipo de privacidad."
        },
        {
          question: "¿Usan cookies?",
          answer: "Sí, usamos cookies esenciales para el funcionamiento de la plataforma y cookies analíticas para mejorar tu experiencia. Puedes gestionar tus preferencias en la configuración."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Centro de Ayuda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Encuentra respuestas a tus preguntas sobre IntelliTax Lex
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar en las preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Preguntas Frecuentes</CardTitle>
            <CardDescription>
              Explora las categorías para encontrar la información que necesitas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{category.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground">
                    No se encontraron resultados para "{searchQuery}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Intenta con otras palabras clave o explora las categorías
                  </p>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="max-w-6xl mx-auto mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">¿No encuentras lo que buscas?</h3>
              <p className="text-muted-foreground mb-4">
                Nuestro equipo de soporte está aquí para ayudarte
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/chat"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <HelpCircle className="h-5 w-5" />
                  Asistente IA
                </a>
                <a
                  href="mailto:soporte@intellitaxlex.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Contactar Soporte
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Ayuda;