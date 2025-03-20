
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const links = [
    { name: "Subir", path: "/upload", protected: false },
    { name: "Explorar", path: "/explorar", protected: false },
    { name: "Contacto", path: "/contacto", protected: false },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] bg-background/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-300
        ${isScrolled ? 'border-b shadow-sm' : ''}
      `}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Semperiter" 
            className={`h-[100px] w-[100px] transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`} 
          />
          <span className={`text-2xl font-bold bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent transition-all duration-300 ${isScrolled ? 'block' : 'hidden'}`}>
            SEMPERITER
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {links
            .filter(link => !link.protected || isAuthenticated)
            .map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-brand-blue dark:text-brand-green font-semibold"
                    : "text-brand-navy/80 dark:text-brand-yellow hover:text-brand-navy dark:hover:text-brand-yellow/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          {isAdmin && adminLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? "text-brand-blue dark:text-brand-green font-semibold"
                  : "text-brand-navy/80 dark:text-brand-yellow hover:text-brand-navy dark:hover:text-brand-yellow/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              className="font-medium border-brand-blue text-brand-blue hover:bg-brand-blue/10 dark:border-brand-yellow dark:text-brand-yellow dark:hover:bg-brand-yellow/20"
              onClick={logout}
            >
              Salir
            </Button>
          ) : (
            <>
              <Button variant="outline" className="font-medium border-brand-blue text-brand-blue hover:bg-brand-blue/10 dark:border-brand-yellow dark:text-brand-yellow dark:hover:bg-brand-yellow/20" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button className="font-medium bg-brand-green hover:bg-brand-green/90 text-white dark:bg-brand-pink dark:hover:bg-brand-pink/90" asChild>
                <Link to="/signup">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {links
              .filter(link => !link.protected || isAuthenticated)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2 ${
                    isActive(link.path)
                      ? "text-primary font-semibold"
                      : "text-foreground/80"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            {isAdmin && adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 ${
                  isActive(link.path)
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-t border-gray-200 my-2" />
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  className="font-medium"
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                >
                  Salir
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="font-medium" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
                  </Button>
                  <Button className="font-medium" asChild>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Registrarse</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
