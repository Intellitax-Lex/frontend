'use client'
import { useState } from "react";
import { createClient } from '../../lib/supabase/client';
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import { Button } from "../../@/components/ui/button";
import { Badge } from "../../@/components/ui/badge";
import { Shield, ShieldOff } from "lucide-react";

interface Usuario {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  roles: string[] | null;
}

interface UsuariosTableProps {
  usuarios: Usuario[];
  onRefresh: () => void;
}

export const UsuariosTable = ({ usuarios, onRefresh }: UsuariosTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const supabase = createClient(); 

  const toggleAdminRole = async (userId: string, isAdmin: boolean) => {
    setLoading(userId);
    try {
      if (isAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");

        if (error) throw error;
        toast.success("Rol de administrador removido");
      } else {
        // Add admin role
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });

        if (error) throw error;
        toast.success("Rol de administrador asignado");
      }

      onRefresh();
    } catch (error: any) {
      console.error("Error toggling admin role:", error);
      toast.error(error.message || "Error al cambiar rol");
    } finally {
      setLoading(null);
    }
  };

  const isAdmin = (roles: string[] | null) => {
    return roles?.includes("admin") || false;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha Registro</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.email}</TableCell>
                <TableCell>{usuario.full_name || "-"}</TableCell>
                <TableCell>{new Date(usuario.created_at).toLocaleDateString('es-ES')}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {isAdmin(usuario.roles) && (
                      <Badge variant="default">Admin</Badge>
                    )}
                    {!usuario.roles || usuario.roles.length === 0 ? (
                      <Badge variant="secondary">Usuario</Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={isAdmin(usuario.roles) ? "destructive" : "outline"}
                    onClick={() => toggleAdminRole(usuario.id, isAdmin(usuario.roles))}
                    disabled={loading === usuario.id}
                  >
                    {isAdmin(usuario.roles) ? (
                      <>
                        <ShieldOff className="w-4 h-4 mr-2" />
                        Quitar Admin
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Hacer Admin
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};