
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be replaced with actual map initialization
    // using a library like Mapbox in a real implementation
    if (mapRef.current) {
      const pulse = document.createElement('div');
      pulse.className = 'w-3 h-3 bg-primary rounded-full animate-pulse-slow';
      mapRef.current.appendChild(pulse);
    }
  }, []);

  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent">
              Navega por el mapa y encuentra fotos de un lugar especial
            </h1>
            <p className="text-lg text-muted-foreground">
              Comparte tus mejores fotos de viaje y ayuda a inspirar a otros
              aventureros con tus experiencias y descubrimientos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full bg-brand-green hover:bg-brand-green/90 text-white" asChild>
                <Link to="/explorar">Explorar ahora</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-brand-blue text-brand-blue hover:bg-brand-blue/10" asChild>
                <Link to="/subir">Subir fotos</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 animate-fade-in stagger-2">
              <div className="absolute -top-14 right-20 w-16 h-16 rounded-full bg-secondary/30 animate-float stagger-1"></div>
              <div className="absolute top-10 right-8 w-6 h-6 rounded-full bg-primary/20 animate-float stagger-3"></div>
              
              <div className="relative rounded-full overflow-hidden border-8 border-white/80 shadow-xl animate-scale-in">
                <img 
                  src="https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?ixlib=rb-4.0.3" 
                  alt="Travel Photography" 
                  className="w-full h-full object-cover" 
                />
                
                <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1 text-xs flex items-center">
                  <span className="mr-1">📍</span> Madrid, España
                </div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-lg overflow-hidden border-4 border-white/80 shadow-lg rotate-6 animate-scale-in stagger-3">
                <img 
                  src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3" 
                  alt="Beach destination" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-24 h-24 rounded-lg overflow-hidden border-4 border-white/80 shadow-lg -rotate-6 animate-scale-in stagger-2">
                <img 
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3" 
                  alt="Mountain view" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-gradient-to-bl from-brand-blue/20 to-transparent rounded-bl-full opacity-70"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-gradient-to-tr from-brand-pink/10 to-transparent rounded-tr-full opacity-70"></div>
    </section>
  );
};

export default HeroSection;
