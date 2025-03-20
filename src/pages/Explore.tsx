
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ExploreSidebar from "@/components/ExploreSidebar";
import ExploreMap from "@/components/ExploreMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExploreGallery from "@/components/ExploreGallery";
import api from "@/lib/api";
import { defaultDestinations } from "@/lib/defaultDestinations";
import { getImageUrl } from "@/lib/utils";

interface Photo {
  id: string;
  title: string;
  filename?: string;
  imageUrl?: string;
  location?: string;
  country?: string;
  continent?: string;
  region?: string;
  city?: string;
  status: string;
  latitude?: number;
  longitude?: number;
  coordinates?: [number, number];
  likes?: number;
  views?: number;
  category?: string[];
  uploadDate?: string;
  user?: {
    name: string;
    email: string;
  };
}

const Explore = () => {
  const [viewMode, setViewMode] = useState<"map" | "gallery">("map");
  const [searchParams] = useSearchParams();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Usar los destinos por defecto directamente
        const defaultPhotos = defaultDestinations.map(dest => ({
          id: dest.id,
          title: dest.name,
          location: dest.name,
          imageUrl: dest.relatedImages?.[0],
          status: 'approved',
          coordinates: dest.coordinates,
          continent: dest.continent,
          country: dest.country,
          region: dest.region,
          city: dest.city,
          user: dest.uploadedBy,
          likes: dest.likes,
          views: dest.views,
          uploadDate: dest.uploadDate,
          category: dest.category
        }));

        // Aplicar filtros
        const continent = searchParams.get("continent");
        const country = searchParams.get("country");
        const region = searchParams.get("region");
        const city = searchParams.get("city");
        const categories = searchParams.get("categories")?.split(",");
        const search = searchParams.get("search")?.toLowerCase();

        let filteredDestinations = defaultPhotos;

        // Filtrar por ubicación y otros criterios
        filteredDestinations = filteredDestinations.filter(dest => {
          // Filtrar por continente
          if (continent && dest.continent?.toLowerCase() !== continent.toLowerCase()) return false;

          // Filtrar por país
          if (country && dest.country?.toLowerCase() !== country.toLowerCase()) return false;

          // Filtrar por región
          if (region && dest.region?.toLowerCase() !== region.toLowerCase()) return false;

          // Filtrar por ciudad
          if (city && dest.city?.toLowerCase() !== city.toLowerCase()) return false;

          // Filtrar por categorías
          if (categories && categories.length > 0 && 
              !categories.some(cat => dest.category.includes(cat))) {
            return false;
          }

          // Filtrar por búsqueda
          if (search) {
            const searchTerms = [
              dest.title,
              dest.location,
              dest.country,
              dest.region,
              dest.city,
              dest.continent,
              dest.user.name
            ].map(term => term?.toLowerCase() || '');

            return searchTerms.some(term => term.includes(search));
          }

          return true;
        });

        setPhotos(filteredDestinations);
      } catch (error) {
        console.error('Error processing destinations:', error);
        setPhotos([]);
      }
    };

    fetchDestinations();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-navy/5 to-brand-blue/5 dark:from-brand-navy/20 dark:to-brand-blue/20">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green bg-clip-text text-transparent dark:from-brand-yellow dark:via-brand-green dark:to-brand-pink">Explorar Destinos</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <ExploreSidebar />
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as "map" | "gallery")}>
                <TabsList className="grid w-full max-w-xs grid-cols-2">
                  <TabsTrigger value="map">Mapa</TabsTrigger>
                  <TabsTrigger value="gallery">Galería</TabsTrigger>
                </TabsList>
                <TabsContent value="map" className="mt-4">
                  <ExploreMap locations={photos.map(photo => ({
                    id: photo.id,
                    title: photo.title,
                    location: photo.location || `${photo.city || photo.region || photo.country || 'Desconocido'}${photo.continent ? `, ${photo.continent}` : ''}`,
                    imageUrl: getImageUrl(photo.imageUrl, photo.filename),
                    user: photo.user,
                    likes: photo.likes || 0,
                    coordinates: photo.coordinates || [40.416775, -3.703790] as [number, number]
                  }))} />
                </TabsContent>
                <TabsContent value="gallery" className="mt-4">
                  <ExploreGallery photos={photos.map(photo => ({
                    id: photo.id,
                    title: photo.title,
                    location: photo.location || `${photo.city || photo.region || photo.country || 'Desconocido'}${photo.continent ? `, ${photo.continent}` : ''}`,
                    country: photo.country || 'Desconocido',
                    continent: photo.continent || 'Desconocido',
                    region: photo.region || 'Desconocido',
                    city: photo.city || 'Desconocido',
                    imageUrl: getImageUrl(photo.imageUrl, photo.filename),
                    user: photo.user,
                    likes: photo.likes || 0,
                    views: photo.views || 0,
                    category: photo.category || [photo.continent?.toLowerCase() || 'otros'],
                    uploadDate: photo.uploadDate
                  }))} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
