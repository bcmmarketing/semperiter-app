import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, CheckCircle2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  createdAt: string;
  stats: {
    totalPhotos: number;
    totalComments: number;
  };
}

export default function UserManagement() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserStatus = async (userId: string, action: 'block' | 'unblock') => {
    try {
      await fetch(`http://localhost:3001/api/admin/users/${userId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent dark:from-brand-yellow dark:via-brand-green dark:to-brand-pink">
        Gestión de Usuarios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <span className="text-lg font-medium text-brand-blue">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status === 'active' ? 'Activo' : 'Bloqueado'}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm font-medium">Fotos</p>
                  <p className="text-2xl font-bold">{user.stats.totalPhotos}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Comentarios</p>
                  <p className="text-2xl font-bold">{user.stats.totalComments}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Rol</p>
                  <p className="text-2xl font-bold">{user.role === 'admin' ? '👑' : '👤'}</p>
                </div>
              </div>
              <div className="flex justify-end">
                {user.status === 'active' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserStatus(user.id, 'block')}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Ban className="h-4 w-4 mr-1" />
                    Bloquear
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserStatus(user.id, 'unblock')}
                    className="text-green-500 hover:text-green-600"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Desbloquear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
