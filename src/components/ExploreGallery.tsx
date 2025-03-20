
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/Image";
import { getImageUrl } from "@/lib/utils";

interface ExploreGalleryProps {
  photos: Array<{
    id: string;
    title: string;
    location?: string;
    country: string;
    continent: string;
    region: string;
    city: string;
    user?: {
      name: string;
      email: string;
      avatar?: string;
    };
    likes?: number;
    views?: number;
    imageUrl?: string;
    filename?: string;
    category?: string[];
    uploadDate?: string;
  }>;
}

const ExploreGallery = ({ photos }: ExploreGalleryProps) => {
  const [likedPhotos, setLikedPhotos] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPhotos(prev => 
      prev.includes(id) 
        ? prev.filter(photoId => photoId !== id)
        : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map(photo => (
        <Card key={photo.id} className="overflow-hidden dark:bg-slate-900/80 dark:border-slate-700 group hover:shadow-lg transition-shadow duration-300">
          <Link to={`/destino/${photo.id}`}>
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image 
                src={getImageUrl(photo.imageUrl, photo.filename)} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/default/placeholder.jpg';
                }}
              />
              <div className="absolute top-3 right-3 flex flex-wrap gap-2 max-w-[70%]">
                {photo.category?.map((cat, index) => (
                  <Badge key={index} variant="secondary" className="bg-black/50 text-white hover:bg-black/60">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-medium text-lg leading-tight dark:text-slate-200">{photo.title}</h3>
                <div className="space-y-1">
                  <p className="text-muted-foreground dark:text-slate-400 text-sm">{photo.city}, {photo.region}</p>
                  <p className="text-muted-foreground dark:text-slate-400 text-sm">{photo.country} - {photo.continent}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={getImageUrl(photo.user?.avatar, undefined, '/default-avatar.jpg')} 
                  alt={photo.user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate dark:text-slate-300">@{photo.user?.name}</p>
                {photo.uploadDate && (
                  <p className="text-xs text-muted-foreground dark:text-slate-400">
                    {formatDate(photo.uploadDate)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t dark:border-slate-700 flex justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:text-red-500"
                  onClick={() => toggleLike(photo.id)}
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors ${likedPhotos.includes(photo.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <span className="text-sm font-medium">
                  {likedPhotos.includes(photo.id) ? (photo.likes || 0) + 1 : (photo.likes || 0)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground dark:text-slate-400">
                  {photo.views?.toLocaleString()} vistas
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ExploreGallery;
