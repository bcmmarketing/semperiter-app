import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';

interface Photo {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  country: string;
  continent: string;
  region?: string;
  city?: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
}



export default function Moderation() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [pendingPhotos, setPendingPhotos] = useState<Photo[]>([]);


  useEffect(() => {
    fetchPendingContent();
  }, [token]);

  const fetchPendingContent = async () => {
    try {
      const { data } = await api.get('/admin/photos/pending');
      setPendingPhotos(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al cargar el contenido pendiente"
      });
    }
  };

  const moderatePhoto = async (photoId: string, status: 'approved' | 'rejected') => {
    try {
      await api.patch('/admin/photos/' + photoId + '/moderate', { status });
      setPendingPhotos(photos => photos.filter(p => p.id !== photoId));
      toast({
        title: "Éxito",
        description: 'Foto ' + (status === 'approved' ? 'aprobada' : 'rechazada') + ' correctamente'
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al moderar la foto"
      });
    }
  };



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Moderación de Contenido</h1>

      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos">
            Fotos ({pendingPhotos.length})
          </TabsTrigger>

        </TabsList>

        <TabsContent value="photos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPhotos.map((photo) => (
              <Card key={photo.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{photo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-sm mb-2"><strong>País:</strong> {photo.country}</p>
                  <p className="text-sm mb-2"><strong>Continente:</strong> {photo.continent}</p>
                  {photo.region && <p className="text-sm mb-2"><strong>Región:</strong> {photo.region}</p>}
                  {photo.city && <p className="text-sm mb-2"><strong>Ciudad:</strong> {photo.city}</p>}
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      onClick={() => moderatePhoto(photo.id, 'approved')}
                    >
                      Aprobar
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => moderatePhoto(photo.id, 'rejected')}
                    >
                      Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>


      </Tabs>
    </div>
  );
}
