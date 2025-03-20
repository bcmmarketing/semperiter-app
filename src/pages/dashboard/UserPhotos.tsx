import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface UserPhoto {
  id: string;
  filename: string;
  title: string;
  country: string;
  region?: string;
  city?: string;
  status: string;
  createdAt: string;
}

const UserPhotos = () => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/photos/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Error al cargar las fotos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserPhotos();
    }
  }, [user, token]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'approved':
        return <Badge className="bg-brand-green">Aprobada</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rechazada</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Fotos</h1>

      {photos.length === 0 ? (
        <p className="text-center text-muted-foreground">No has subido ninguna foto aún.</p>
      ) : (
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-video mb-4 relative rounded-md overflow-hidden">
                    <img
                      src={`http://localhost:3005/uploads/${photo.filename}`}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{photo.title}</h3>
                      {getStatusBadge(photo.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {[photo.country, photo.region, photo.city].filter(Boolean).join(', ')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Subida: {new Date(photo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default UserPhotos;
