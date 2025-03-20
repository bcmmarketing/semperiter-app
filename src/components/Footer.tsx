
import { Link } from "react-router-dom";
import { Instagram, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gradient">Semperiter</h3>
            <p className="text-sm text-muted-foreground">
              Comparte tus mejores momentos de viaje y descubre destinos
              increíbles a través de las experiencias de otros viajeros.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/subir" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Subir fotos
                </Link>
              </li>
              <li>
                <Link to="/explorar" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explorar
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Soporte y ayuda
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contacto</h4>
            <div className="flex items-center space-x-2">
              <Instagram className="w-4 h-4 text-muted-foreground" />
              <a href="https://instagram.com/semperiter" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                @semperiter
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a href="mailto:soporte@semperiter.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                soporte@semperiter.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Semperiter. Todos los derechos reservados.
            <br />
            <span className="flex items-center justify-center mt-2">
              Hecho con <Heart className="w-3 h-3 mx-1 text-red-500" fill="currentColor" /> para viajeros de todo el mundo
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
