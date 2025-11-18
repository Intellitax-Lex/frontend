'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
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
import { Input } from "../../@/components/ui/input";
import { Pencil, Trash2, Plus, Save, X, Eye } from "lucide-react";
import { Badge } from "../../@/components/ui/badge";

interface Curso {
  id: string;
  titulo: string;
  instructor: string;
  duracion: string;
  nivel: string;
  total_lecciones: number;
  activo: boolean;
  descripcion: string;
}

interface CursosTableProps {
  cursos: Curso[];
  onRefresh: () => void;
}

export const CursosTable = ({ cursos, onRefresh }: CursosTableProps) => {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Curso>>({});
  const [showNewForm, setShowNewForm] = useState(false);
  const supabase = createClient(); 

  const startEdit = (curso: Curso) => {
    setEditingId(curso.id);
    setEditForm(curso);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from("cursos")
        .update(editForm)
        .eq("id", editingId);

      if (error) throw error;

      toast.success("Curso actualizado");
      setEditingId(null);
      setEditForm({});
      onRefresh();
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Error al actualizar curso");
    }
  };

  const deleteCurso = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este curso?")) return;

    try {
      const { error } = await supabase
        .from("cursos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Curso eliminado");
      onRefresh();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Error al eliminar curso");
    }
  };

  const createCurso = async () => {
    try {
      const { error } = await supabase
        .from("cursos")
        .insert([{
          titulo: editForm.titulo || "Nuevo Curso",
          instructor: editForm.instructor || "Instructor",
          duracion: editForm.duracion || "4 semanas",
          nivel: editForm.nivel || "Principiante",
          total_lecciones: editForm.total_lecciones || 10,
          activo: editForm.activo ?? true,
          descripcion: editForm.descripcion || "Descripción del curso"
        }]);

      if (error) throw error;

      toast.success("Curso creado");
      setShowNewForm(false);
      setEditForm({});
      onRefresh();
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Error al crear curso");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestión de Cursos</h3>
        <Button onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Curso
        </Button>
      </div>

      {showNewForm && (
        <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
          <h4 className="font-medium">Nuevo Curso</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Título"
              value={editForm.titulo || ""}
              onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
            />
            <Input
              placeholder="Instructor"
              value={editForm.instructor || ""}
              onChange={(e) => setEditForm({ ...editForm, instructor: e.target.value })}
            />
            <Input
              placeholder="Duración"
              value={editForm.duracion || ""}
              onChange={(e) => setEditForm({ ...editForm, duracion: e.target.value })}
            />
            <Input
              placeholder="Nivel"
              value={editForm.nivel || ""}
              onChange={(e) => setEditForm({ ...editForm, nivel: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Total Lecciones"
              value={editForm.total_lecciones || ""}
              onChange={(e) => setEditForm({ ...editForm, total_lecciones: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={createCurso}>Crear</Button>
            <Button variant="outline" onClick={() => { setShowNewForm(false); setEditForm({}); }}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Lecciones</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id}>
                {editingId === curso.id ? (
                  <>
                    <TableCell>
                      <Input
                        value={editForm.titulo || ""}
                        onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editForm.instructor || ""}
                        onChange={(e) => setEditForm({ ...editForm, instructor: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editForm.duracion || ""}
                        onChange={(e) => setEditForm({ ...editForm, duracion: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editForm.nivel || ""}
                        onChange={(e) => setEditForm({ ...editForm, nivel: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editForm.total_lecciones || ""}
                        onChange={(e) => setEditForm({ ...editForm, total_lecciones: parseInt(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        className="border rounded px-2 py-1"
                        value={editForm.activo ? "true" : "false"}
                        onChange={(e) => setEditForm({ ...editForm, activo: e.target.value === "true" })}
                      >
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                      </select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" onClick={saveEdit}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="font-medium">{curso.titulo}</TableCell>
                    <TableCell>{curso.instructor}</TableCell>
                    <TableCell>{curso.duracion}</TableCell>
                    <TableCell>{curso.nivel}</TableCell>
                    <TableCell>{curso.total_lecciones}</TableCell>
                    <TableCell>
                      <Badge variant={curso.activo ? "default" : "secondary"}>
                        {curso.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => router.push(`/cursos/${curso.id}`)}
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => startEdit(curso)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteCurso(curso.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};