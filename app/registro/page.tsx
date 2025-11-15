'use client'
import { useState } from 'react';
import  Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../@/components/ui/card';
import { Label } from '../../@/components/ui/label';
import { Checkbox } from '../../@/components/ui/checkbox';
import { useToast } from '../../@/hooks/use-toast';
// import { supabase } from '@/integrations/supabase/client';
import { Scale } from 'lucide-react';

const Registro = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'personal'
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast({
        title: "Error",
        description: "Debes aceptar la Política de Privacidad y Términos",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // const { error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      //   options: {
      //     data: {
      //       full_name: formData.fullName,
      //       plan: formData.plan
      //     },
      //     emailRedirectTo: `${window.location.origin}/chat`
      //   }
      // });

      const error = null;

      if (error) throw error;

      toast({
        title: "Registro exitoso",
        description: "Bienvenido a IntelliTax Lex. Redirigiendo...",
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-legal-navy via-legal-dark to-legal-navy p-4">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-legal-navy to-legal-dark">
              <Scale className="h-10 w-10 text-legal-gold" />
            </div>
          </div>
          <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
          <CardDescription>
            Comience su experiencia con IntelliTax Lex
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input 
                id="fullName" 
                placeholder="Juan Pérez"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select value={formData.plan} onValueChange={(value) => setFormData({...formData, plan: value})}>
                <SelectTrigger id="plan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal (100 preguntas/mes)</SelectItem>
                  <SelectItem value="profesional">Profesional (500 preguntas/mes)</SelectItem>
                  <SelectItem value="estudio">Estudio (1000 preguntas/mes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-start gap-2">
              <Checkbox 
                id="terms" 
                className="mt-1"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                Acepto la{" "}
                <Link href="/privacidad" className="font-medium text-legal-gold hover:underline">
                  Política de Privacidad y Tratamiento de Datos
                </Link>{" "}
                y los{" "}
                <Link href="/terminos" className="font-medium text-legal-gold hover:underline">
                  Términos de Uso
                </Link>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-legal-gold text-legal-dark hover:bg-legal-gold/90"
              disabled={isLoading || !acceptedTerms}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tiene una cuenta?{" "}
            <Link href="/login" className="font-medium text-legal-gold hover:underline">
              Inicie sesión
            </Link>
          </p>
          <Link href="/" className="text-center text-sm text-muted-foreground hover:underline">
            Volver al inicio
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Registro;