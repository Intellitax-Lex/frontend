'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../@/components/ui/tabs";
import { Card, CardContent } from "../../../@/components/ui/card";
import { createClient } from "../../../lib/supabase/client";
import { toast } from "sonner";
import { AdminDashboard } from "../../../components/admin/AdminDashboard";
import { UsuariosTable } from "../../../components/admin/UsuariosTable";
import { CursosTable } from "../../../components/admin/CursosTable";
import ArticulosTable from "../../../components/admin/ArticulosTable";
import { CuponesTable } from "../../../components/admin/CuponesTable";
import { LibrosTable } from "../../../components/admin/LibrosTable";
import { Shield } from "lucide-react";

const Admin = () => {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [libros, setLibros] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Debes iniciar sesión");
        router.push("/login");
        return;
      }

      // Call server-side admin verification function
      const { data, error } = await supabase.functions.invoke("verify-admin");

      console.log(data, error)

      if (error) {
        console.error("Error verifying admin access:", error);
        toast.error("Error al verificar permisos");
        router.push("/dashboard");
        return;
      }

      if (!data?.isAdmin) {
        toast.error("No tienes permisos de administrador");
        router.push("/dashboard");
        return;
      }

      loadData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast.error("Error al verificar acceso");
      router.push("/dashboard");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadLibros(), loadCursos(), loadUsuarios()]);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const loadLibros = async () => {
    const { data, error } = await supabase
      .from("libros")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    setLibros(data || []);
  };

  const loadCursos = async () => {
    const { data, error } = await supabase
      .from("cursos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    setCursos(data || []);
  };

  const loadUsuarios = async () => {
    const { data, error } = await supabase.rpc("get_users_with_roles");

    if (error) throw error;
    setUsuarios(data || []);
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
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">Panel de Administración</h1>
              <p className="text-muted-foreground">
                Gestiona libros, cursos y usuarios
              </p>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="libros">Libros</TabsTrigger>
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
              <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
              <TabsTrigger value="cupones">Cupones</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="libros">
              <Card>
                <CardContent className="pt-6">
                  <LibrosTable libros={libros} onRefresh={loadLibros} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cursos">
              <Card>
                <CardContent className="pt-6">
                  <CursosTable cursos={cursos} onRefresh={loadCursos} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usuarios">
              <Card>
                <CardContent className="pt-6">
                  <UsuariosTable usuarios={usuarios} onRefresh={loadUsuarios} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cupones">
              <Card>
                <CardContent className="pt-6">
                  <CuponesTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog">
              <Card>
                <CardContent className="pt-6">
                  <ArticulosTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
