import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from '../../lib/supabase/client';
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Textarea } from "../../@/components/ui/textarea";
import { Label } from "../../@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { useToast } from "../../@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";

const ArticulosTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticulo, setEditingArticulo] = useState<any>(null);
  const supabase = createClient(); 

  const [formData, setFormData] = useState({
    titulo: "",
    slug: "",
    contenido: "",
    resumen: "",
    autor: "",
    categoria: "",
    imagen_url: "",
    activo: true,
  });

  const { data: articulos, isLoading } = useQuery({
    queryKey: ["admin-articulos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articulos_blog")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("articulos_blog").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articulos"] });
      toast({ title: "Artículo creado exitosamente" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error al crear artículo",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from("articulos_blog")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articulos"] });
      toast({ title: "Artículo actualizado exitosamente" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar artículo",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articulos_blog").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articulos"] });
      toast({ title: "Artículo eliminado exitosamente" });
    },
    onError: (error) => {
      toast({
        title: "Error al eliminar artículo",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      titulo: "",
      slug: "",
      contenido: "",
      resumen: "",
      autor: "",
      categoria: "",
      imagen_url: "",
      activo: true,
    });
    setEditingArticulo(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticulo) {
      updateMutation.mutate({ id: editingArticulo.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (articulo: any) => {
    setEditingArticulo(articulo);
    setFormData({
      titulo: articulo.titulo,
      slug: articulo.slug,
      contenido: articulo.contenido,
      resumen: articulo.resumen || "",
      autor: articulo.autor,
      categoria: articulo.categoria,
      imagen_url: articulo.imagen_url || "",
      activo: articulo.activo,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este artículo?")) {
      deleteMutation.mutate(id);
    }
  };

  const toggleActivo = (articulo: any) => {
    updateMutation.mutate({
      id: articulo.id,
      data: { activo: !articulo.activo },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Artículos del Blog</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Artículo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArticulo ? "Editar Artículo" : "Nuevo Artículo"}
              </DialogTitle>
              <DialogDescription>
                Completa los datos del artículo del blog
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ejemplo-slug-url"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="autor">Autor *</Label>
                  <Input
                    id="autor"
                    value={formData.autor}
                    onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoria: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Legislación">Legislación</SelectItem>
                      <SelectItem value="Análisis">Análisis</SelectItem>
                      <SelectItem value="Actualidad">Actualidad</SelectItem>
                      <SelectItem value="Tributario">Tributario</SelectItem>
                      <SelectItem value="Jurisprudencia">Jurisprudencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="imagen_url">URL Imagen</Label>
                  <Input
                    id="imagen_url"
                    type="url"
                    value={formData.imagen_url}
                    onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="resumen">Resumen</Label>
                  <Textarea
                    id="resumen"
                    value={formData.resumen}
                    onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="contenido">Contenido *</Label>
                  <Textarea
                    id="contenido"
                    value={formData.contenido}
                    onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                    rows={10}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingArticulo ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : articulos && articulos.length > 0 ? (
              articulos.map((articulo) => (
                <TableRow key={articulo.id}>
                  <TableCell className="font-medium">{articulo.titulo}</TableCell>
                  <TableCell>{articulo.autor}</TableCell>
                  <TableCell>{articulo.categoria}</TableCell>
                  <TableCell>
                    {format(new Date(articulo.fecha_publicacion), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActivo(articulo)}
                      className={articulo.activo ? "text-green-600" : "text-muted-foreground"}
                    >
                      {articulo.activo ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(articulo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(articulo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No hay artículos registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ArticulosTable;