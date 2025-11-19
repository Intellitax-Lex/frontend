'use client'
import { useRouter } from "next/navigation";
import { Button } from "../../../@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../@/components/ui/card";
import { Badge } from "../../../@/components/ui/badge";
import { BookOpen, ShoppingCart, Trash2, Heart } from "lucide-react";
import { useCarrito } from "../../../hooks/useCarrito";
import { useWishlist } from "../../../hooks/useWishlist";
import { toast } from "sonner";

const Wishlist = () => {
  const router = useRouter();
  const { items, loading, eliminarDeWishlist } = useWishlist();
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = async (libroId: string, precio: number) => {
    try {
      await agregarAlCarrito("libro", libroId, precio);
      toast.success("Libro agregado al carrito");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error al agregar al carrito");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-4xl font-bold">Mi Lista de Deseos</h1>
          </div>

          {items.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h2 className="text-2xl font-semibold mb-2">Tu lista de deseos está vacía</h2>
                <p className="text-muted-foreground mb-6">
                  Explora nuestra biblioteca y guarda los libros que te interesen
                </p>
                <Button onClick={() => router.push("/biblioteca")}>
                  Explorar Biblioteca
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div 
                      className="cursor-pointer"
                      onClick={() => router.push(`/biblioteca/${item.libro_id}`)}
                    >
                      {item.libros.imagen_url ? (
                        <img
                          src={item.libros.imagen_url}
                          alt={item.libros.titulo}
                          className="w-full aspect-[3/4] object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle 
                        className="line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => router.push(`/biblioteca/${item.libro_id}`)}
                      >
                        {item.libros.titulo}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => eliminarDeWishlist(item.id)}
                        className="shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <CardDescription>
                      <p className="text-sm mb-2">{item.libros.autor}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.libros.categoria}</Badge>
                        <span className="text-lg font-bold text-primary">
                          ₲{item.libros.precio.toLocaleString()}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => router.push(`/biblioteca/${item.libro_id}`)}
                    >
                      Ver detalles
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleAgregarAlCarrito(item.libro_id, item.libros.precio)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;