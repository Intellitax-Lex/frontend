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
import { Input } from "../../@/components/ui/input";
import { Pencil, Trash2, Plus, Save, X, Upload, FileText } from "lucide-react";
import { Badge } from "../../@/components/ui/badge";
import { Label } from "../../@/components/ui/label";

interface Libro {
  id: string;
  titulo: string;
  autor: string;
  año: number;
  precio: number;
  categoria: string;
  paginas: number;
  formato: string;
  activo: boolean;
  descripcion: string | null;
  imagen_url: string | null;
  archivo_url: string | null;
}

interface LibrosTableProps {
  libros: Libro[];
  onRefresh: () => void;
}

export const LibrosTable = ({ libros, onRefresh }: LibrosTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Libro>>({});
  const [showNewForm, setShowNewForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingBookId, setUploadingBookId] = useState<string | null>(null);
  const supabase = createClient(); 

  const startEdit = (libro: Libro) => {
    setEditingId(libro.id);
    setEditForm(libro);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from("libros")
        .update(editForm)
        .eq("id", editingId);

      if (error) throw error;

      toast.success("Libro actualizado");
      setEditingId(null);
      setEditForm({});
      onRefresh();
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Error al actualizar libro");
    }
  };

  const deleteLibro = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este libro?")) return;

    try {
      const { error } = await supabase
        .from("libros")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Libro eliminado");
      onRefresh();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error al eliminar libro");
    }
  };

  const createLibro = async () => {
    try {
      const { error } = await supabase
        .from("libros")
        .insert([{
          titulo: editForm.titulo || "Nuevo Libro",
          autor: editForm.autor || "Autor",
          año: editForm.año || new Date().getFullYear(),
          precio: editForm.precio || 0,
          categoria: editForm.categoria || "General",
          paginas: editForm.paginas || 100,
          formato: editForm.formato || "PDF Digital",
          activo: editForm.activo ?? true,
          descripcion: editForm.descripcion,
          imagen_url: editForm.imagen_url
        }]);

      if (error) throw error;

      toast.success("Libro creado");
      setShowNewForm(false);
      setEditForm({});
      onRefresh();
    } catch (error) {
      console.error("Error creating book:", error);
      toast.error("Error al crear libro");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, libroId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Solo se permiten archivos PDF");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("El archivo no debe superar 50MB");
      return;
    }

    setUploading(true);
    setUploadingBookId(libroId);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuario no autenticado");

      const fileExt = file.name.split('.').pop();
      const fileName = `${libroId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("libros")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("libros")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("libros")
        .update({ archivo_url: publicUrl })
        .eq("id", libroId);

      if (updateError) throw updateError;

      toast.success("Archivo PDF cargado exitosamente");
      onRefresh();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message || "Error al cargar el archivo");
    } finally {
      setUploading(false);
      setUploadingBookId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestión de Libros</h3>
        <Button onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Libro
        </Button>
      </div>

      {showNewForm && (
        <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
          <h4 className="font-medium">Nuevo Libro</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Título"
              value={editForm.titulo || ""}
              onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
            />
            <Input
              placeholder="Autor"
              value={editForm.autor || ""}
              onChange={(e) => setEditForm({ ...editForm, autor: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Año"
              value={editForm.año || ""}
              onChange={(e) => setEditForm({ ...editForm, año: parseInt(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Precio"
              value={editForm.precio || ""}
              onChange={(e) => setEditForm({ ...editForm, precio: parseFloat(e.target.value) })}
            />
            <Input
              placeholder="Categoría"
              value={editForm.categoria || ""}
              onChange={(e) => setEditForm({ ...editForm, categoria: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Páginas"
              value={editForm.paginas || ""}
              onChange={(e) => setEditForm({ ...editForm, paginas: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={createLibro}>Crear</Button>
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
              <TableHead>Autor</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Archivo PDF</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {libros.map((libro) => (
              <TableRow key={libro.id}>
                {editingId === libro.id ? (
                  <>
                    <TableCell>
                      <Input
                        value={editForm.titulo || ""}
                        onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editForm.autor || ""}
                        onChange={(e) => setEditForm({ ...editForm, autor: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editForm.año || ""}
                        onChange={(e) => setEditForm({ ...editForm, año: parseInt(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editForm.precio || ""}
                        onChange={(e) => setEditForm({ ...editForm, precio: parseFloat(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>-</TableCell>
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
                    <TableCell className="font-medium">{libro.titulo}</TableCell>
                    <TableCell>{libro.autor}</TableCell>
                    <TableCell>{libro.año}</TableCell>
                    <TableCell>₲{libro.precio.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        {libro.archivo_url ? (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-muted-foreground">PDF disponible</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sin archivo</span>
                        )}
                        <Label htmlFor={`pdf-${libro.id}`} className="cursor-pointer">
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={uploading && uploadingBookId === libro.id}
                            asChild
                          >
                            <span>
                              <Upload className="w-3 h-3 mr-2" />
                              {uploading && uploadingBookId === libro.id ? "Subiendo..." : "Subir PDF"}
                            </span>
                          </Button>
                        </Label>
                        <Input
                          id={`pdf-${libro.id}`}
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, libro.id)}
                          disabled={uploading}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={libro.activo ? "default" : "secondary"}>
                        {libro.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => startEdit(libro)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteLibro(libro.id)}>
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