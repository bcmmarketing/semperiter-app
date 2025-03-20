import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Search, Mail, Shield, Trash2, UserX, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  email: string;
  name: string;
  isBlocked: boolean;
  createdAt: string;
  role: string;
  lastLogin: string;
  status: string;
  warnings: number;
}

// Datos ficticios
const mockUsers: User[] = [
  {
    id: '1',
    email: 'ana.garcia@example.com',
    name: 'Ana García',
    isBlocked: false,
    createdAt: '2024-01-15',
    role: 'user',
    lastLogin: '2025-03-18',
    status: 'active',
    warnings: 0
  },
  {
    id: '2',
    email: 'carlos.lopez@example.com',
    name: 'Carlos López',
    isBlocked: true,
    createdAt: '2024-02-01',
    role: 'user',
    lastLogin: '2025-02-28',
    status: 'blocked',
    warnings: 3
  },
  {
    id: '3',
    email: 'maria.rodriguez@example.com',
    name: 'María Rodríguez',
    isBlocked: false,
    createdAt: '2024-01-20',
    role: 'user',
    lastLogin: '2025-03-17',
    status: 'active',
    warnings: 1
  },
  {
    id: '4',
    email: 'juan.martinez@example.com',
    name: 'Juan Martínez',
    isBlocked: false,
    createdAt: '2024-03-01',
    role: 'user',
    lastLogin: '2025-03-15',
    status: 'active',
    warnings: 2
  }
];

export default function Users() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
    toast({
      title: "Usuario eliminado",
      description: `${user.name} ha sido eliminado correctamente`
    });
    setShowDeleteDialog(false);
  };

  const handleBlockUser = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isBlocked: true, status: 'blocked' } : u
    ));
    toast({
      title: "Usuario bloqueado",
      description: `${user.name} ha sido bloqueado por uso indebido`
    });
    setShowBlockDialog(false);
  };

  const handleResetPassword = (user: User) => {
    toast({
      title: "Contraseña restablecida",
      description: `Se ha enviado un email a ${user.email} con las instrucciones`
    });
    setShowResetDialog(false);
  };

  const handleUnblockUser = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isBlocked: false, status: 'active' } : u
    ));
    toast({
      title: "Usuario desbloqueado",
      description: `${user.name} ha sido desbloqueado`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="blocked">Bloqueados</TabsTrigger>
          <TabsTrigger value="warned">Con advertencias</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex gap-4 items-center">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.warnings > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {user.warnings} advertencias
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Último acceso: {new Date(user.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <AlertDialog open={showResetDialog && selectedUser?.id === user.id}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowResetDialog(true);
                        }}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Restablecer contraseña</AlertDialogTitle>
                        <AlertDialogDescription>
                          Se enviará un email a {user.email} con instrucciones para restablecer la contraseña.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowResetDialog(false)}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleResetPassword(user)}>
                          Enviar email
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog open={showBlockDialog && selectedUser?.id === user.id}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowBlockDialog(true);
                        }}
                        disabled={user.isBlocked}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Bloquear usuario</AlertDialogTitle>
                        <AlertDialogDescription>
                          ¿Estás seguro de que quieres bloquear a {user.name}? El usuario no podrá acceder a su cuenta.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowBlockDialog(false)}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleBlockUser(user)}>
                          Bloquear usuario
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog open={showDeleteDialog && selectedUser?.id === user.id}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
                        <AlertDialogDescription>
                          ¿Estás seguro de que quieres eliminar a {user.name}? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteUser(user)}>
                          Eliminar usuario
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {user.isBlocked ? (
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleUnblockUser(user)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  ) : null}

                  {user.warnings > 0 && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {filteredUsers.filter(user => !user.isBlocked).map((user) => (
            <Card key={user.id}>...</Card>
          ))}
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          {filteredUsers.filter(user => user.isBlocked).map((user) => (
            <Card key={user.id}>...</Card>
          ))}
        </TabsContent>

        <TabsContent value="warned" className="space-y-4">
          {filteredUsers.filter(user => user.warnings > 0).map((user) => (
            <Card key={user.id}>...</Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
