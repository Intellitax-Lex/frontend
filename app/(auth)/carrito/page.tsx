'use client'
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "../../../@/components/ui/button";
import { Card, CardContent } from "../../../@/components/ui/card";
import { Separator } from "../../../@/components/ui/separator";
import { useCarrito } from "../../../hooks/useCarrito";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

const Carrito = () => {
  const { items, loading, eliminarDelCarrito, calcularTotal } = useCarrito();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  const total = calcularTotal();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

          {items.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground mb-4">
                  Tu carrito está vacío
                </p>
                <Button onClick={() => router.push("/biblioteca")}>
                  Ver Biblioteca
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {item.imagen_url && (
                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            className="w-24 h-32 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            {item.nombre}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            {item.tipo_item === "libro" ? "Libro" : "Curso"}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            ₲{item.precio.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => eliminarDelCarrito(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Resumen</h2>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₲{total.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">
                          ₲{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => router.push("/checkout")}
                    >
                      Proceder al Pago
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Carrito;
