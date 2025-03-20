import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function PhotoModeration() {
  const { token } = useAuth();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetchPendingPhotos();
  }, [token]);

  const fetchPendingPhotos = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/photos/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching pending photos:', error);
    }
  };

  const handleModeration = async (photoId: string, action: 'approve' | 'reject') => {
    try {
      await fetch(`http://localhost:3001/api/admin/photos/${photoId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchPendingPhotos();
    } catch (error) {
      console.error('Error moderating photo:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent dark:from-brand-yellow dark:via-brand-green dark:to-brand-pink">
        Moderación de Fotos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id}>
            <CardHeader>
              <CardTitle className="text-lg">{photo.title}</CardTitle>
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
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModeration(photo.id, 'reject')}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4 mr-1" />
                  Rechazar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModeration(photo.id, 'approve')}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Aprobar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
