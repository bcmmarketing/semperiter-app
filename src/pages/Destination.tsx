import { useParams } from "react-router-dom";
import { Heart, MapPin, Share2, User, Image as ImageIcon, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { defaultDestinations } from "@/lib/defaultDestinations";
import DestinationMap from "@/components/DestinationMap";
import { ImageModal } from "@/components/ImageModal";
import { BlurredImage } from "@/components/BlurredImage";
import { getImageUrl } from "@/lib/utils";

interface Photo {
  id: string;
  title: string;
  filename: string;
  country: string;
  continent: string;
  region?: string;
  city?: string;
  status: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  relatedImages?: string[];
  user: {
    name: string;
    email: string;
  };
}

const Destination = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState<string>("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        // Primero buscar en los destinos por defecto
        const defaultDest = defaultDestinations.find(d => d.id === id);
        if (defaultDest) {
          setPhoto({
            id: defaultDest.id,
            title: defaultDest.name,
            filename: defaultDest.relatedImages?.[0] || `default/${defaultDest.id}/main.jpg`,
            country: defaultDest.country,
            continent: defaultDest.continent,
            region: defaultDest.region,
            city: defaultDest.city,
            status: 'approved',
            latitude: defaultDest.coordinates[0],
            longitude: defaultDest.coordinates[1],
            description: defaultDest.description,
            relatedImages: defaultDest.relatedImages || [],
            user: {
              name: 'Semperiter',
              email: 'info@semperiter.com'
            }
          });
        } else {
          // Si no es un destino por defecto, buscar en la API
          const { data } = await api.get(`/photos/${id}`);
          setPhoto(data);
        }
      } catch (error) {
        setError('Error al cargar el destino');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto pt-24 pb-16">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="container max-w-4xl mx-auto pt-24 pb-16">
        <h1 className="text-2xl font-bold mb-4">Destino no encontrado</h1>
        <p>Lo sentimos, el destino que buscas no existe.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-navy/5 to-brand-blue/5 dark:from-brand-navy/20 dark:to-brand-blue/20">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-8">
        <img
          src={getImageUrl(photo.filename)}
          alt={`${photo.title}, ${photo.country}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="container mx-auto h-full flex flex-col justify-end px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {photo.title}, {photo.country}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center bg-black/30 rounded-full px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{photo.latitude?.toFixed(4) || 'N/A'}, {photo.longitude?.toFixed(4) || 'N/A'}</span>
              </div>
              <div className="flex items-center bg-black/30 rounded-full px-4 py-2">
                <User className="w-4 h-4 mr-2" />
                <span>@{photo.user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Sobre el destino</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Foto tomada en {photo.city || photo.region || photo.country}, {photo.continent}
                </p>
                {photo.description && (
                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                )}
                
                <Separator className="my-6" />
                
                <div className="flex flex-wrap gap-2 mb-8">
                  <Badge variant="secondary" className="text-base py-1 px-3">{photo.continent}</Badge>
                  <Badge variant="secondary" className="text-base py-1 px-3">{photo.country}</Badge>
                  {photo.region && <Badge variant="secondary" className="text-base py-1 px-3">{photo.region}</Badge>}
                  {photo.city && <Badge variant="secondary" className="text-base py-1 px-3">{photo.city}</Badge>}
                </div>

                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Galería de imágenes
                </h3>

                {/* Imagen principal */}
                <Card 
                  className="mb-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    const imageUrl = getImageUrl(photo.filename);
                    setSelectedImage(imageUrl);
                    setImageTitle(`${photo.title} - Vista Principal`);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="aspect-[21/9] relative rounded-lg overflow-hidden">
                      <BlurredImage
                        src={getImageUrl(photo.filename)}
                        alt={`${photo.title} - Principal`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = '/images/default/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <Badge variant="secondary" className="text-base py-1.5 px-4">
                          Vista Principal
                        </Badge>
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Imágenes relacionadas */}
                {photo.relatedImages && photo.relatedImages.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photo.relatedImages.map((image, index) => (
                      <Card 
                        key={index} 
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => {
                          const imageUrl = getImageUrl(image);
                          setSelectedImage(imageUrl);
                          setImageTitle(`${photo.title} - Vista ${index + 1}`);
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="aspect-square relative rounded-lg overflow-hidden group">
                            <BlurredImage
                              src={getImageUrl(image)}
                              alt={`${photo.title} - ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                if (img.src.includes('/uploads/')) {
                                  img.src = `/images/default/placeholder.jpg`;
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                              <Badge variant="secondary" className="text-base py-1.5 px-4">
                                Vista {index + 1}
                              </Badge>
                              <Button variant="secondary" size="icon" className="h-8 w-8">
                                <ZoomIn className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Modal para zoom */}
                <ImageModal
                  isOpen={!!selectedImage}
                  onClose={() => setSelectedImage(null)}
                  imageUrl={selectedImage || ''}
                  title={imageTitle}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Badge variant="outline" className="text-lg py-2 px-4">
                    📍 {photo.city || photo.region || photo.country}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-10 w-10">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-10 w-10">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {photo.latitude && photo.longitude && (
                  <DestinationMap
                    latitude={photo.latitude}
                    longitude={photo.longitude}
                    label={photo.city || photo.region || photo.country}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
