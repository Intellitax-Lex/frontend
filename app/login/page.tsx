'use client'
import { useState } from 'react';
import  Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../@/components/ui/card';
import { Label } from '../../@/components/ui/label';
import { useToast } from "../../@/hooks/use-toast"
import { createClient } from '../../lib/supabase/client';
import { Scale } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient(); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
     });

      if (error) throw error;

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a IntelliTax Lex",
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-legal-navy via-legal-dark to-legal-navy p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-legal-navy to-legal-dark">
              <Scale className="h-10 w-10 text-legal-gold" />
            </div>
          </div>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Acceda a su cuenta de IntelliTax Lex
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-legal-gold text-legal-dark hover:bg-legal-gold/90"
              disabled={isLoading}
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-center text-sm text-muted-foreground">
            ¿No tiene una cuenta?{" "}
            <Link href="/registro" className="font-medium text-legal-gold hover:underline">
              Regístrese aquí
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

export default Login;