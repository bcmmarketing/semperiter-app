import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import config from '@/config';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Photo {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  stats: {
    likes: number;
    comments: number;
  };
}

export default function MyPhotos() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchMyPhotos();
  }, [token]);

  const fetchMyPhotos = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/photos/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleDelete = async (photoId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la foto');
      }

      setPhotos(photos.filter(photo => photo.id !== photoId));
      toast({
        title: "Foto eliminada",
        description: "La foto ha sido eliminada correctamente.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar la foto",
      });
    }
  };

  const getStatusBadge = (status: Photo['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Aprobada</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rechazada</Badge>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent dark:from-brand-yellow dark:via-brand-green dark:to-brand-pink">
        Mis Fotos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{photo.title}</CardTitle>
                {getStatusBadge(photo.status)}
              </div>
              <p className="text-sm text-muted-foreground">{photo.location}</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <p className="text-sm mb-4">{photo.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <span>❤️ {photo.stats.likes}</span>
                  <span>💬 {photo.stats.comments}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/subir?edit=${photo.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(photo.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
