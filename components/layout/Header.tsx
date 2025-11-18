'use client'
import  Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "../../@/components/ui/button";
import { Scale, LayoutDashboard, User, Shield, ShoppingCart, Heart } from "lucide-react";
import { createClient } from '../../lib/supabase/client';
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../@/components/ui/avatar";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient(); 

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });


    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      checkAdminRole(user.id);
    }
  };

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data && !error);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "U";
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-legal-navy to-legal-dark">
            <Scale className="h-6 w-6 text-legal-gold" />
          </div>
          <span className="text-xl font-bold text-foreground">IntelliTax Lex</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/chat" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Asistente IA
          </Link>
          <Link href="/contratos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contratos
          </Link>
          <Link href="/cursos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Cursos
          </Link>
          <Link href="/biblioteca" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Biblioteca
          </Link>
          <Link href="/certificados" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Certificados
          </Link>
          <Link href="/facturas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Facturas
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push("/carrito")}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push("/wishlist")}
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              {isAdmin && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push("/admin")}
                  className="text-primary"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem  onClick={() => router.push("/perfil")}>
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Acceder
                </Button>
              </Link>
              <Link href="/registro">
                <Button size="sm" className="bg-legal-gold text-legal-dark hover:bg-legal-gold/90">
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;