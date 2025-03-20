import { Link } from "react-router-dom";
import { Instagram, Mail, Heart } from "lucide-react";

export function AdminFooter() {
  return (
    <footer className="bg-background py-6 border-t mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              © 2025 Semperiter. Todos los derechos reservados.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </Link>
            <Link to="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Términos
            </Link>
            <a href="mailto:contact@semperiter.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
