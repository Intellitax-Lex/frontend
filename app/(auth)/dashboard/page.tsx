'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { Progress } from "../../../@/components/ui/progress";
import { Badge } from "../../../@/components/ui/badge";
import { 
  MessageSquare, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  Calendar,
  Clock,
  Award
} from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
import { Toast } from "../../../@/components/ui/toast";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [stats, setStats] = useState({
    chatQuestions: 0,
    contractsGenerated: 0,
    coursesInProgress: 0,
    booksOwned: 0,
    certificatesEarned: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // checkAuth();
  }, []);

//   const checkAuth = async () => {
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) {
//         router.push("/login");
//         return;
//       }
//       setUser(user);
//       await loadUserData(user.id);
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Error al cargar los datos");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUserData = async (userId: string) => {
//     const { data: subData } = await supabase
//       .from("Suscripciones")
//       .select("*")
//       .eq("user_id", userId)
//       .single();

//     if (subData) {
//       setSubscription(subData);
//     }

//     // Load chat history count
//     const { count: chatCount } = await supabase
//       .from("Historial_Chat")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     // Load contracts count
//     const { count: contractsCount } = await supabase
//       .from("contratos_generados")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     // Load courses count
//     const { count: coursesCount } = await supabase
//       .from("inscripciones_cursos")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     // Load certificates count
//     const { count: certificatesCount } = await supabase
//       .from("certificados")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     setStats(prev => ({ 
//       ...prev, 
//       chatQuestions: chatCount || 0,
//       contractsGenerated: contractsCount || 0,
//       coursesInProgress: coursesCount || 0,
//       certificatesEarned: certificatesCount || 0
//     }));
//   };

  const getPlanName = (plan: string) => {
    const names: Record<string, string> = {
      personal: "Personal",
      profesional: "Profesional", 
      estudio: "Estudio Jurídico"
    };
    return names[plan] || plan;
  };

  const getPlanColor = (plan: string) => {
    const colors: Record<string, string> = {
      personal: "bg-blue-500",
      profesional: "bg-purple-500",
      estudio: "bg-amber-500"
    };
    return colors[plan] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const questionsUsed = subscription?.preguntas_restantes_mes 
    ? (100 - subscription.preguntas_restantes_mes) 
    : 0;
  const questionsPercentage = (questionsUsed / 100) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              ¡Bienvenido, {user?.user_metadata?.full_name || "Usuario"}!
            </h1>
            <p className="text-muted-foreground">
              Aquí está el resumen de tu actividad en IntelliTax Lex
            </p>
          </div>

          {/* Subscription Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Plan Actual</CardTitle>
                  <CardDescription>Tu suscripción activa</CardDescription>
                </div>
                <Badge className={`${getPlanColor(subscription?.plan || "personal")} text-white`}>
                  {getPlanName(subscription?.plan || "personal")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Preguntas IA este mes</span>
                  <span className="font-medium">
                    {questionsUsed} / 100 utilizadas
                  </span>
                </div>
                <Progress value={questionsPercentage} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Fecha de vencimiento
                  </div>
                  <p className="font-medium">
                    {subscription?.fecha_vencimiento 
                      ? new Date(subscription.fecha_vencimiento).toLocaleDateString()
                      : "No disponible"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Estado
                  </div>
                  <p className="font-medium capitalize">{subscription?.estado || "Activo"}</p>
                </div>
              </div>
              <Button className="w-full" variant="outline" onClick={() => router.push("/perfil")}>
                Administrar Suscripción
              </Button>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/chat")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consultas IA
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.chatQuestions}</div>
                <p className="text-xs text-muted-foreground">
                  Total de preguntas realizadas
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/contratos")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Contratos
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.contractsGenerated}</div>
                <p className="text-xs text-muted-foreground">
                  Documentos generados
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/cursos")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cursos
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.coursesInProgress}</div>
                <p className="text-xs text-muted-foreground">
                  En progreso
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/biblioteca")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Biblioteca
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.booksOwned}</div>
                <p className="text-xs text-muted-foreground">
                  Libros adquiridos
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push("/certificados")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Certificados
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
                <p className="text-xs text-muted-foreground">
                  Obtenidos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Accesos Rápidos</CardTitle>
              <CardDescription>
                Accede a las funcionalidades más utilizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => router.push("/chat")}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm">Asistente IA</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => router.push("/contratos")}
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm">Nuevo Contrato</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => router.push("/facturas")}
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">Analizar Factura</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex-col gap-2 py-4"
                onClick={() => router.push("/cursos")}
              >
                <Award className="h-5 w-5" />
                <span className="text-sm">Mis Cursos</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Tus últimas interacciones con la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b">
                  <MessageSquare className="w-4 h-4 text-primary mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Consulta sobre IVA</p>
                    <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b">
                  <GraduationCap className="w-4 h-4 text-primary mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Avance en curso: Fundamentos del IVA</p>
                    <p className="text-xs text-muted-foreground">Hace 1 día</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-primary mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Libro adquirido: Manual de Derecho Tributario</p>
                    <p className="text-xs text-muted-foreground">Hace 3 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
    </div>
  );
};

export default Dashboard;