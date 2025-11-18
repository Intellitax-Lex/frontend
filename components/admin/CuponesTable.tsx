import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import { useToast } from "../../@/hooks/use-toast";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
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
import { Switch } from "../../@/components/ui/switch";
import { Pencil, Plus, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

interface Cupon {
  id: string;
  codigo: string;
  descripcion: string | null;
  tipo_descuento: string;
  valor_descuento: number;
  usos_maximos: number | null;
  usos_actuales: number;
  fecha_inicio: string;
  fecha_expiracion: string | null;
  activo: boolean;
  monto_minimo: number | null;
  tipo_restriccion: string;
  categorias_permitidas: string[] | null;
  productos_permitidos: string[] | null;
}

interface FormData {
  codigo: string;
  descripcion: string;
  tipo_descuento: "porcentaje" | "monto_fijo";
  valor_descuento: string;
  usos_maximos: string;
  fecha_inicio: string;
  fecha_expiracion: string;
  monto_minimo: string;
  tipo_restriccion: "ninguna" | "categoria" | "productos_especificos";
  categorias_permitidas: string[];
  productos_permitidos: string[];
}

export const CuponesTable = () => {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCupon, setEditingCupon] = useState<Cupon | null>(null);
  const [estadisticas, setEstadisticas] = useState<{
    totalCupones: number;
    cuponesActivos: number;
    totalUsos: number;
    descuentoTotal: number;
  } | null>(null);
  const [libros, setLibros] = useState<Array<{ id: string; titulo: string }>>(
    []
  );
  const [cursos, setCursos] = useState<Array<{ id: string; titulo: string }>>(
    []
  );
  const supabase = createClient();

  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    codigo: "",
    descripcion: "",
    tipo_descuento: "porcentaje",
    valor_descuento: "",
    usos_maximos: "",
    fecha_inicio: new Date().toISOString().split("T")[0],
    fecha_expiracion: "",
    monto_minimo: "",
    tipo_restriccion: "ninguna",
    categorias_permitidas: [],
    productos_permitidos: [],
  });

  useEffect(() => {
    cargarCupones();
    cargarEstadisticas();
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const { data: librosData } = await supabase
        .from("libros")
        .select("id, titulo")
        .eq("activo", true)
        .order("titulo");

      const { data: cursosData } = await supabase
        .from("cursos")
        .select("id, titulo")
        .eq("activo", true)
        .order("titulo");

      setLibros(librosData || []);
      setCursos(cursosData || []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const cargarCupones = async () => {
    try {
      const { data, error } = await supabase
        .from("cupones")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCupones(data || []);
    } catch (error) {
      console.error("Error al cargar cupones:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los cupones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const { data: cupones } = await supabase.from("cupones").select("*");
      const { data: usos } = await supabase
        .from("uso_cupones")
        .select("monto_descuento");

      setEstadisticas({
        totalCupones: cupones?.length || 0,
        cuponesActivos: cupones?.filter((c) => c.activo).length || 0,
        totalUsos: usos?.length || 0,
        descuentoTotal:
          usos?.reduce((sum, u) => sum + Number(u.monto_descuento), 0) || 0,
      });
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      codigo: "",
      descripcion: "",
      tipo_descuento: "porcentaje",
      valor_descuento: "",
      usos_maximos: "",
      fecha_inicio: new Date().toISOString().split("T")[0],
      fecha_expiracion: "",
      monto_minimo: "",
      tipo_restriccion: "ninguna",
      categorias_permitidas: [],
      productos_permitidos: [],
    });
    setEditingCupon(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cuponData = {
        codigo: formData.codigo.toUpperCase(),
        descripcion: formData.descripcion || null,
        tipo_descuento: formData.tipo_descuento,
        valor_descuento: parseFloat(formData.valor_descuento),
        usos_maximos: formData.usos_maximos
          ? parseInt(formData.usos_maximos)
          : null,
        fecha_inicio: formData.fecha_inicio,
        fecha_expiracion: formData.fecha_expiracion || null,
        monto_minimo: formData.monto_minimo
          ? parseFloat(formData.monto_minimo)
          : null,
        tipo_restriccion: formData.tipo_restriccion,
        categorias_permitidas:
          formData.tipo_restriccion === "categoria"
            ? formData.categorias_permitidas
            : null,
        productos_permitidos:
          formData.tipo_restriccion === "productos_especificos"
            ? formData.productos_permitidos
            : null,
      };

      if (editingCupon) {
        const { error } = await supabase
          .from("cupones")
          .update(cuponData)
          .eq("id", editingCupon.id);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Cupón actualizado correctamente",
        });
      } else {
        const { error } = await supabase.from("cupones").insert(cuponData);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Cupón creado correctamente",
        });
      }

      setDialogOpen(false);
      resetForm();
      cargarCupones();
      cargarEstadisticas();
    } catch (error) {
      console.error("Error al guardar cupón:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el cupón",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (cupon: Cupon) => {
    setEditingCupon(cupon);
    setFormData({
      codigo: cupon.codigo,
      descripcion: cupon.descripcion || "",
      tipo_descuento: cupon.tipo_descuento as "porcentaje" | "monto_fijo",
      valor_descuento: cupon.valor_descuento.toString(),
      usos_maximos: cupon.usos_maximos?.toString() || "",
      fecha_inicio: cupon.fecha_inicio.split("T")[0],
      fecha_expiracion: cupon.fecha_expiracion?.split("T")[0] || "",
      monto_minimo: cupon.monto_minimo?.toString() || "",
      tipo_restriccion: cupon.tipo_restriccion as
        | "ninguna"
        | "categoria"
        | "productos_especificos",
      categorias_permitidas: cupon.categorias_permitidas || [],
      productos_permitidos: cupon.productos_permitidos || [],
    });
    setDialogOpen(true);
  };

  const toggleActivo = async (id: string, activo: boolean) => {
    try {
      const { error } = await supabase
        .from("cupones")
        .update({ activo: !activo })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: `Cupón ${
          !activo ? "activado" : "desactivado"
        } correctamente`,
      });

      cargarCupones();
      cargarEstadisticas();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado del cupón",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      {estadisticas && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Cupones
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estadisticas.totalCupones}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Cupones Activos
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {estadisticas.cuponesActivos}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Usos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estadisticas.totalUsos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Descuento Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ₲{estadisticas.descuentoTotal.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botón crear */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Cupones</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cupón
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCupon ? "Editar Cupón" : "Crear Nuevo Cupón"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código *</Label>
                  <Input
                    id="codigo"
                    value={formData.codigo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        codigo: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="DESCUENTO20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo_descuento">Tipo de Descuento *</Label>
                  <Select
                    value={formData.tipo_descuento}
                    onValueChange={(value: "porcentaje" | "monto_fijo") =>
                      setFormData({ ...formData, tipo_descuento: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="porcentaje">Porcentaje (%)</SelectItem>
                      <SelectItem value="monto_fijo">Monto Fijo (₲)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor_descuento">
                    Valor del Descuento *{" "}
                    {formData.tipo_descuento === "porcentaje" ? "(%)" : "(₲)"}
                  </Label>
                  <Input
                    id="valor_descuento"
                    type="number"
                    step="0.01"
                    value={formData.valor_descuento}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        valor_descuento: e.target.value,
                      })
                    }
                    placeholder={
                      formData.tipo_descuento === "porcentaje" ? "20" : "50000"
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usos_maximos">Usos Máximos</Label>
                  <Input
                    id="usos_maximos"
                    type="number"
                    value={formData.usos_maximos}
                    onChange={(e) =>
                      setFormData({ ...formData, usos_maximos: e.target.value })
                    }
                    placeholder="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monto_minimo">Monto Mínimo (₲)</Label>
                  <Input
                    id="monto_minimo"
                    type="number"
                    step="0.01"
                    value={formData.monto_minimo}
                    onChange={(e) =>
                      setFormData({ ...formData, monto_minimo: e.target.value })
                    }
                    placeholder="100000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha_inicio">Fecha de Inicio *</Label>
                  <Input
                    id="fecha_inicio"
                    type="date"
                    value={formData.fecha_inicio}
                    onChange={(e) =>
                      setFormData({ ...formData, fecha_inicio: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha_expiracion">Fecha de Expiración</Label>
                  <Input
                    id="fecha_expiracion"
                    type="date"
                    value={formData.fecha_expiracion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fecha_expiracion: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  placeholder="20% de descuento en todos los productos"
                />
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold">Restricciones</h3>

                <div className="space-y-2">
                  <Label htmlFor="tipo_restriccion">Tipo de Restricción</Label>
                  <Select
                    value={formData.tipo_restriccion}
                    onValueChange={(
                      value: "ninguna" | "categoria" | "productos_especificos"
                    ) =>
                      setFormData({
                        ...formData,
                        tipo_restriccion: value,
                        categorias_permitidas: [],
                        productos_permitidos: [],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ninguna">Sin restricciones</SelectItem>
                      <SelectItem value="categoria">Por categoría</SelectItem>
                      <SelectItem value="productos_especificos">
                        Productos específicos
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.tipo_restriccion === "categoria" && (
                  <div className="space-y-2">
                    <Label>Categorías Permitidas</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.categorias_permitidas.includes(
                            "libro"
                          )}
                          onChange={(e) => {
                            const cats = e.target.checked
                              ? [...formData.categorias_permitidas, "libro"]
                              : formData.categorias_permitidas.filter(
                                  (c) => c !== "libro"
                                );
                            setFormData({
                              ...formData,
                              categorias_permitidas: cats,
                            });
                          }}
                          className="rounded border-input"
                        />
                        <span>Libros</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.categorias_permitidas.includes(
                            "curso"
                          )}
                          onChange={(e) => {
                            const cats = e.target.checked
                              ? [...formData.categorias_permitidas, "curso"]
                              : formData.categorias_permitidas.filter(
                                  (c) => c !== "curso"
                                );
                            setFormData({
                              ...formData,
                              categorias_permitidas: cats,
                            });
                          }}
                          className="rounded border-input"
                        />
                        <span>Cursos</span>
                      </label>
                    </div>
                  </div>
                )}

                {formData.tipo_restriccion === "productos_especificos" && (
                  <div className="space-y-2">
                    <Label>Productos Permitidos</Label>
                    <div className="max-h-48 overflow-y-auto space-y-2 border rounded-md p-3">
                      <div className="font-medium text-sm mb-2">Libros</div>
                      {libros.map((libro) => (
                        <label
                          key={libro.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.productos_permitidos.includes(
                              libro.id
                            )}
                            onChange={(e) => {
                              const prods = e.target.checked
                                ? [...formData.productos_permitidos, libro.id]
                                : formData.productos_permitidos.filter(
                                    (p) => p !== libro.id
                                  );
                              setFormData({
                                ...formData,
                                productos_permitidos: prods,
                              });
                            }}
                            className="rounded border-input"
                          />
                          <span className="text-sm">{libro.titulo}</span>
                        </label>
                      ))}

                      <div className="font-medium text-sm mt-4 mb-2">
                        Cursos
                      </div>
                      {cursos.map((curso) => (
                        <label
                          key={curso.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.productos_permitidos.includes(
                              curso.id
                            )}
                            onChange={(e) => {
                              const prods = e.target.checked
                                ? [...formData.productos_permitidos, curso.id]
                                : formData.productos_permitidos.filter(
                                    (p) => p !== curso.id
                                  );
                              setFormData({
                                ...formData,
                                productos_permitidos: prods,
                              });
                            }}
                            className="rounded border-input"
                          />
                          <span className="text-sm">{curso.titulo}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingCupon ? "Actualizar" : "Crear"} Cupón
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla de cupones */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Descuento</TableHead>
              <TableHead>Usos</TableHead>
              <TableHead>Vigencia</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cupones.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay cupones creados
                </TableCell>
              </TableRow>
            ) : (
              cupones.map((cupon) => (
                <TableRow key={cupon.id}>
                  <TableCell className="font-mono font-semibold">
                    {cupon.codigo}
                  </TableCell>
                  <TableCell className="capitalize">
                    {cupon.tipo_descuento.replace("_", " ")}
                  </TableCell>
                  <TableCell>
                    {cupon.tipo_descuento === "porcentaje"
                      ? `${cupon.valor_descuento}%`
                      : `₲${cupon.valor_descuento.toLocaleString()}`}
                  </TableCell>
                  <TableCell>
                    {cupon.usos_actuales}
                    {cupon.usos_maximos && ` / ${cupon.usos_maximos}`}
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>
                      Desde: {new Date(cupon.fecha_inicio).toLocaleDateString()}
                    </div>
                    {cupon.fecha_expiracion && (
                      <div className="text-muted-foreground">
                        Hasta:{" "}
                        {new Date(cupon.fecha_expiracion).toLocaleDateString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={cupon.activo}
                      onCheckedChange={() =>
                        toggleActivo(cupon.id, cupon.activo)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cupon)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
