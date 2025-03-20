import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PendingPhoto {
  id: string;
  filename: string;
  originalName: string;
  title: string;
  country: string;
  continent?: string;
  region?: string;
  city?: string;
  blurFaces: boolean;
  createdAt: string;
}

const Admin = () => {
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchPendingPhotos = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/photos/pending');
      if (!response.ok) throw new Error('Error al cargar las fotos pendientes');
      const data = await response.json();
      setPendingPhotos(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las fotos pendientes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPhotos();
  }, []);

  const handlePhotoAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`http://localhost:3005/api/photos/${id}/${action}`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error(`Error al ${action === 'approve' ? 'aprobar' : 'rechazar'} la foto`);

      toast({
        title: "¡Éxito!",
        description: `Foto ${action === 'approve' ? 'aprobada' : 'rechazada'} correctamente.`,
      });

      // Actualizar la lista de fotos pendientes
      fetchPendingPhotos();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `No se pudo ${action === 'approve' ? 'aprobar' : 'rechazar'} la foto.`,
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent">
          Panel de Administración
        </h1>

        <div className="bg-card rounded-lg shadow-lg p-6 border">
          <h2 className="text-2xl font-semibold mb-6">Fotos Pendientes de Aprobación</h2>

          {pendingPhotos.length === 0 ? (
            <p className="text-center text-muted-foreground">No hay fotos pendientes de aprobación.</p>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingPhotos.map((photo) => (
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
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {[photo.country, photo.region, photo.city].filter(Boolean).join(', ')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Subida: {new Date(photo.createdAt).toLocaleDateString()}
                        </p>
                        {photo.blurFaces && (
                          <p className="text-sm text-blue-500">Difuminado de caras solicitado</p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handlePhotoAction(photo.id, 'approve')}
                          className="flex-1 bg-brand-green hover:bg-brand-green/90"
                        >
                          Aprobar
                        </Button>
                        <Button
                          onClick={() => handlePhotoAction(photo.id, 'reject')}
                          variant="destructive"
                          className="flex-1"
                        >
                          Rechazar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
