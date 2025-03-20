import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/contexts/AuthContext";
import { login as apiLogin } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Usar la función de login de la API configurada
      const { token, user } = await apiLogin(email, password);
      
      // Guardar el token y la información del usuario
      authLogin(token, user);

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      });

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Error al iniciar sesión",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-navy/5 to-brand-blue/5 dark:from-slate-900 dark:to-brand-navy pt-20">
      <div className="container max-w-[400px] mx-auto px-4 py-8">
        <div className="bg-background dark:bg-slate-900/80 rounded-xl shadow-sm border dark:border-slate-700 p-8">
          <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent dark:from-brand-yellow dark:via-brand-green dark:to-brand-pink">
            Iniciar Sesión
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
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
              className="w-full bg-brand-green hover:bg-brand-green/90"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Entrar"}
            </Button>
          </form>



          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-brand-blue dark:text-brand-yellow"
              onClick={() => navigate("/signup")}
            >
              Regístrate
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
