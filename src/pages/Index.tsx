
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    // En modo demo, mostrar el botón de administración siempre
    setShowAdminButton(true);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent">
              Destinos Populares
            </h2>
            <p className="text-muted-foreground">
              Explora los lugares más valorados por nuestros viajeros
            </p>
          </div>
          {showAdminButton && (
            <Link to="/admin">
              <Button variant="outline" className="gap-2">
                Panel de Administración
              </Button>
            </Link>
          )}
        </div>
        <FeaturedDestinations />
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Comparte tus Aventuras
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de viajeros y comparte tus experiencias únicas.
            Cada fotografía cuenta una historia que merece ser compartida.
          </p>
          <div className="flex justify-center">
            <Link to="/upload">
              <Button size="lg" className="gap-2">
                Subir Fotografías
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
