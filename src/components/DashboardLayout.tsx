import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {user?.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold">{user?.email}</h2>
                  <p className="text-sm text-muted-foreground">Dashboard</p>
                </div>
              </div>
              <nav className="space-y-2">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`
                  }
                >
                  Perfil
                </NavLink>
                <NavLink
                  to="/dashboard/photos"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`
                  }
                >
                  Mis Fotos
                </NavLink>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
