import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Image,
  Users,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    href: "/admin",
  },
  {
    title: "Destinos",
    icon: MapPin,
    href: "/admin/destinations",
  },
  {
    title: "Usuarios",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 top-16"> {/* Añadido top-16 para dar espacio al header */}
        <div className="flex-1 flex flex-col min-h-0 bg-card border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent">
                  Semperiter
                </h1>
              </Link>
            </div>
            <nav className="mt-12 flex-1 px-2 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-accent-foreground"
                      )}
                    />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button
              variant="ghost"
              className="flex-1 flex items-center"
              onClick={() => logout()}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <main className="flex-1 overflow-y-auto bg-background pt-16"> {/* Añadido pt-16 para dar espacio al header */}
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
