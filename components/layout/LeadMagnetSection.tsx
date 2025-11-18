'use client'
import { Mail, Gift, ArrowRight } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { useState } from "react";
import { useToast } from "../../@/hooks/use-toast";

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    toast({
      title: "¡Suscripción exitosa!",
      description: "Recibirás el resumen de las últimas resoluciones SET en tu correo.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-legal-gold/10 via-primary/5 to-legal-gold/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border-2 border-legal-gold/30 bg-card p-8 md:p-12 shadow-strong">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-legal-gold/20 flex items-center justify-center">
                  <Gift className="h-12 w-12 text-legal-gold" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="mb-3 text-2xl font-bold lg:text-3xl">
                  ¿No estás listo para comprar?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Suscríbete a nuestro Newsletter y recibe <span className="text-legal-gold font-semibold">gratis</span> el resumen 
                  de las últimas resoluciones de la SET analizadas por nuestra IA.
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg" 
                    className="bg-legal-gold text-legal-dark hover:bg-legal-gold/90 font-semibold h-12 px-8"
                  >
                    Suscribirme Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
                
                <p className="mt-4 text-xs text-muted-foreground">
                  📧 Sin spam. Solo información valiosa. Cancela cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;