'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../../../@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Badge } from "../../../@/components/ui/badge";
import { Progress } from "../../../@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import { PlayCircle, Clock, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import { toast } from "sonner";

interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  instructor: string;
  imagen_url: string | null;
  total_lecciones: number;
}

interface Inscripcion {
  id: string;
  curso_id: string;
  completado: boolean;
  cursos: Curso;
}

interface Progreso {
  leccion_numero: number;
  completada: boolean;
}

interface MiCurso {
  id: string;
  titulo: string;
  progreso: number;
  leccionActual: string;
  completadas: number;
  total: number;
  inscripcionId: string;
}

interface Certificado {
  id: string;
  codigo_verificacion: string;
  fecha_emision: string;
  cursos: Curso;
}

const Cursos = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("disponibles");
  const [cursosDisponibles, setCursosDisponibles] = useState<Curso[]>([]);
  const [misCursos, setMisCursos] = useState<MiCurso[]>([]);
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
    loadData(user.id);
  };

  const loadData = async (userId: string) => {
    setLoading(true);
    try {
      await Promise.all([
        loadCursosDisponibles(),
        loadMisCursos(userId),
        loadCertificados(userId)
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const loadCursosDisponibles = async () => {
    const { data, error } = await supabase
      .from("cursos")
      .select("*")
      .eq("activo", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    setCursosDisponibles(data || []);
  };

  const loadMisCursos = async (userId: string) => {
    const { data: inscripciones, error } = await supabase
      .from("inscripciones_cursos")
      .select(`
        id,
        curso_id,
        completado,
        cursos (
          id,
          titulo,
          descripcion,
          duracion,
          nivel,
          instructor,
          imagen_url,
          total_lecciones
        )
      `)
      .eq("user_id", userId) as { data: Inscripcion[] | null; error: any };

    if (error) throw error;
    if (!inscripciones) return;

    const cursosConProgreso = await Promise.all(
      inscripciones.map(async (inscripcion) => {
        const { data: progresoData } = await supabase
          .from("progreso_cursos")
          .select("leccion_numero, completada")
          .eq("inscripcion_id", inscripcion.id) as { data: Progreso[] | null };

        const completadas = progresoData?.filter((p) => p.completada).length || 0;
        const total = inscripcion.cursos.total_lecciones;
        const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;

        const siguienteLeccion = progresoData?.find((p) => !p.completada);
        const leccionActual = siguienteLeccion 
          ? `Lección ${siguienteLeccion.leccion_numero}`
          : "Curso completado";

        return {
          id: inscripcion.cursos.id,
          titulo: inscripcion.cursos.titulo,
          progreso,
          leccionActual,
          completadas,
          total,
          inscripcionId: inscripcion.id
        };
      })
    );

    setMisCursos(cursosConProgreso);
  };

  const loadCertificados = async (userId: string) => {
    const { data, error } = await supabase
      .from("certificados")
      .select(`
        id,
        codigo_verificacion,
        fecha_emision,
        cursos (
          id,
          titulo,
          descripcion,
          duracion,
          nivel,
          instructor,
          imagen_url,
          total_lecciones
        )
      `)
      .eq("user_id", userId) as { data: Certificado[] | null; error: any };

    if (error) throw error;
    setCertificados(data || []);
  };

  const handleInscribirse = async (cursoId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const { error } = await supabase
        .from("inscripciones_cursos")
        .insert({
          user_id: user.id,
          curso_id: cursoId
        });

      if (error) {
        if (error.code === "23505") {
          toast.info("Ya estás inscrito en este curso");
          return;
        }
        throw error;
      }

      toast.success("¡Te has inscrito exitosamente!");
      loadData(user.id);
      setActiveTab("mis-cursos");
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Error al inscribirse en el curso");
    }
  };

  const handleContinuar = (inscripcionId: string) => {
    router.push(`/curso/${inscripcionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Academia Tributaria</h1>
            <p className="text-muted-foreground">
              Cursos especializados en derecho tributario paraguayo
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="disponibles">Cursos Disponibles</TabsTrigger>
              <TabsTrigger value="mis-cursos">Mis Cursos</TabsTrigger>
              <TabsTrigger value="certificados">Certificados</TabsTrigger>
            </TabsList>

            <TabsContent value="disponibles" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cursosDisponibles.map((curso) => (
                  <Card key={curso.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${curso.imagen_url || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop'})` }}
                    />
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{curso.nivel}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {curso.duracion}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{curso.titulo}</CardTitle>
                      <CardDescription className="line-clamp-2">{curso.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {curso.total_lecciones} lecciones
                        </div>
                        <span>{curso.instructor}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => router.push(`/curso/${curso.id}`)}>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Comenzar Curso
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mis-cursos" className="space-y-6">
              {misCursos.map((curso) => (
                <Card key={curso.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{curso.titulo}</CardTitle>
                        <CardDescription className="mt-2">
                          Lección actual: {curso.leccionActual}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {curso.completadas}/{curso.total} completadas
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-medium">{curso.progreso}%</span>
                      </div>
                      <Progress value={curso.progreso} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => router.push(`/curso/${curso.id}`)}>
                      Continuar Curso
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="certificados" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificados Obtenidos</CardTitle>
                  <CardDescription>
                    Tus certificados de finalización de cursos
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Award className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Aún no has completado ningún curso.
                    <br />
                    ¡Completa un curso para obtener tu primer certificado!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Cursos;