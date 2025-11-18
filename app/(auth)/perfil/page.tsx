"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../@/components/ui/tabs";
import { Badge } from "../../../@/components/ui/badge";
import { Avatar, AvatarFallback } from "../../../@/components/ui/avatar";
import { User, Mail, Key, CreditCard, LogOut } from "lucide-react";
import { createClient } from "../../../lib/supabase/client";
import { toast } from "sonner";

const Perfil = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setFormData((prev) => ({
        ...prev,
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
      }));

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: subData } = await supabase
        .from("Suscripciones")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile(profileData);
      setSubscription(subData);
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Error al cargar los datos del usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: formData.fullName },
      });

      if (error) throw error;

      toast.success("Perfil actualizado correctamente");
      loadUserData();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Error al actualizar el perfil");
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) throw error;

      toast.success("Contraseña actualizada correctamente");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error.message || "Error al cambiar la contraseña");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getPlanName = (plan: string) => {
    const names: Record<string, string> = {
      personal: "Personal",
      profesional: "Profesional",
      estudio: "Estudio Jurídico",
    };
    return names[plan] || plan;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const initials = formData.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
            <p className="text-muted-foreground">
              Administra tu cuenta y preferencias
            </p>
          </div>

          <div className="mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{formData.fullName}</h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                    <Badge className="mt-2">
                      {getPlanName(subscription?.plan || "personal")}
                    </Badge>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="datos" className="space-y-6">
            <TabsList>
              <TabsTrigger value="datos">Datos Personales</TabsTrigger>
              <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
              <TabsTrigger value="suscripcion">Suscripción</TabsTrigger>
            </TabsList>

            <TabsContent value="datos">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tus datos personales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="fullName"
                        className="pl-10"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      El correo no puede ser modificado
                    </p>
                  </div>

                  <Button onClick={handleUpdateProfile} disabled={updating}>
                    {updating ? "Actualizando..." : "Guardar Cambios"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seguridad">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <CardDescription>
                    Mantén tu cuenta segura actualizando tu contraseña
                    regularmente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="newPassword"
                        type="password"
                        className="pl-10"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmar Contraseña
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handleChangePassword} disabled={updating}>
                    {updating ? "Actualizando..." : "Cambiar Contraseña"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suscripcion">
              <Card>
                <CardHeader>
                  <CardTitle>Suscripción Activa</CardTitle>
                  <CardDescription>
                    Administra tu plan y facturación
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Plan Actual
                      </Label>
                      <p className="text-xl font-bold">
                        {getPlanName(subscription?.plan || "personal")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Estado</Label>
                      <Badge variant="outline" className="capitalize">
                        {subscription?.estado || "Activo"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Preguntas Restantes
                      </Label>
                      <p className="text-xl font-bold">
                        {subscription?.preguntas_restantes_mes || 0} / 100
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">
                        Próxima Renovación
                      </Label>
                      <p className="text-xl font-bold">
                        {subscription?.fecha_vencimiento
                          ? new Date(
                              subscription.fecha_vencimiento
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Cambiar Plan
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Historial de Pagos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
