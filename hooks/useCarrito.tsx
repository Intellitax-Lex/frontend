import { useState, useEffect } from "react";
import { useToast } from "../@/hooks/use-toast";
import { createClient } from "../lib/supabase/client";

export interface ItemCarrito {
  id: string;
  tipo_item: "libro" | "curso";
  item_id: string;
  cantidad: number;
  precio: number;
  nombre: string;
  imagen_url?: string;
}

export const useCarrito = () => {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const supabase = createClient();

  const cargarCarrito = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("carrito")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      // Enriquecer con datos de libros/cursos
      const itemsEnriquecidos = await Promise.all(
        (data || []).map(async (item) => {
          if (item.tipo_item === "libro") {
            const { data: libro } = await supabase
              .from("libros")
              .select("titulo, imagen_url")
              .eq("id", item.item_id)
              .single();
            return {
              id: item.id,
              tipo_item: item.tipo_item as "libro" | "curso",
              item_id: item.item_id,
              cantidad: item.cantidad,
              precio: item.precio,
              nombre: libro?.titulo || "Libro",
              imagen_url: libro?.imagen_url,
            };
          } else {
            const { data: curso } = await supabase
              .from("cursos")
              .select("titulo, imagen_url")
              .eq("id", item.item_id)
              .single();
            return {
              id: item.id,
              tipo_item: item.tipo_item as "libro" | "curso",
              item_id: item.item_id,
              cantidad: item.cantidad,
              precio: item.precio,
              nombre: curso?.titulo || "Curso",
              imagen_url: curso?.imagen_url,
            };
          }
        })
      );

      setItems(itemsEnriquecidos);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar el carrito",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const agregarAlCarrito = async (
    tipo: "libro" | "curso",
    itemId: string,
    precio: number
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para agregar al carrito",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("carrito").insert({
        user_id: user.id,
        tipo_item: tipo,
        item_id: itemId,
        cantidad: 1,
        precio,
      });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Producto agregado al carrito",
      });

      await cargarCarrito();
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast({
        title: "Error",
        description: "No se pudo agregar al carrito",
        variant: "destructive",
      });
    }
  };

  const eliminarDelCarrito = async (id: string) => {
    try {
      const { error } = await supabase.from("carrito").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Producto eliminado del carrito",
      });

      await cargarCarrito();
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar del carrito",
        variant: "destructive",
      });
    }
  };

  const actualizarCantidad = async (id: string, cantidad: number) => {
    try {
      const { error } = await supabase
        .from("carrito")
        .update({ cantidad })
        .eq("id", id);

      if (error) throw error;

      await cargarCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la cantidad",
        variant: "destructive",
      });
    }
  };

  const vaciarCarrito = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("carrito")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  };

  const calcularTotal = () => {
    return items.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  return {
    items,
    loading,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
    recargar: cargarCarrito,
  };
};
