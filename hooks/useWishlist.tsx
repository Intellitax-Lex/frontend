import { useState, useEffect } from 'react';
import { createClient } from "../lib/supabase/client";
import { toast } from 'sonner';

interface LibroWishlist {
  id: string;
  libro_id: string;
  created_at: string;
  libros: {
    id: string;
    titulo: string;
    autor: string;
    precio: number;
    imagen_url: string | null;
    categoria: string;
  };
}

export const useWishlist = () => {
  const [items, setItems] = useState<LibroWishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const supabase = createClient();

  const cargarWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('wishlist_libros')
        .select(`
          id,
          libro_id,
          created_at,
          libros (
            id,
            titulo,
            autor,
            precio,
            imagen_url,
            categoria
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems((data as unknown as LibroWishlist[]) || []);
      setWishlistIds(new Set((data || []).map(item => item.libro_id)));
    } catch (error) {
      console.error('Error al cargar wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (libroId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Debes iniciar sesión para usar la lista de deseos');
        return;
      }

      const enWishlist = wishlistIds.has(libroId);

      if (enWishlist) {
        // Eliminar de wishlist
        const { error } = await supabase
          .from('wishlist_libros')
          .delete()
          .eq('user_id', user.id)
          .eq('libro_id', libroId);

        if (error) throw error;

        toast.success('Eliminado de la lista de deseos');
      } else {
        // Agregar a wishlist
        const { error } = await supabase
          .from('wishlist_libros')
          .insert({
            user_id: user.id,
            libro_id: libroId
          });

        if (error) throw error;

        toast.success('Agregado a la lista de deseos');
      }

      await cargarWishlist();
    } catch (error) {
      console.error('Error al modificar wishlist:', error);
      toast.error('Error al modificar la lista de deseos');
    }
  };

  const eliminarDeWishlist = async (wishlistItemId: string) => {
    try {
      const { error } = await supabase
        .from('wishlist_libros')
        .delete()
        .eq('id', wishlistItemId);

      if (error) throw error;

      toast.success('Eliminado de la lista de deseos');
      await cargarWishlist();
    } catch (error) {
      console.error('Error al eliminar de wishlist:', error);
      toast.error('Error al eliminar de la lista de deseos');
    }
  };

  const estaEnWishlist = (libroId: string) => {
    return wishlistIds.has(libroId);
  };

  useEffect(() => {
    cargarWishlist();
  }, []);

  return {
    items,
    loading,
    toggleWishlist,
    eliminarDeWishlist,
    estaEnWishlist,
    cargarWishlist
  };
};