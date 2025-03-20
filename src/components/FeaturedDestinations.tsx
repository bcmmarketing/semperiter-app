
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { defaultDestinations } from '@/lib/defaultDestinations';

import { getImageUrl } from '@/lib/utils';
import type { Destination } from '@/types/destinations';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<(Destination & { liked: boolean })[]>(
    defaultDestinations.slice(0, 4).map(dest => ({
      ...dest,
      liked: false
    }))
  );

  const handleLike = (id: string) => {
    setDestinations(destinations.map(dest => {
      if (dest.id === id) {
        return {
          ...dest,
          likes: dest.liked ? dest.likes - 1 : dest.likes + 1,
          liked: !dest.liked
        };
      }
      return dest;
    }));
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Destinos más valorados</h2>
        <p className="text-muted-foreground mb-10">
          Descubre los destinos favoritos de nuestra comunidad
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <Card 
              key={dest.id} 
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-transparent"
            >
              <Link to={`/destino/${dest.id}`} className="block h-48 overflow-hidden">
                <img 
                  src={getImageUrl(dest.relatedImages?.[0], `default/${dest.id}.jpg`)} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                  loading="lazy"
                />
              </Link>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs text-primary font-medium">{dest.city}, {dest.country}</p>
                    <h3 className="font-medium text-sm line-clamp-1">{dest.name}</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(dest.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${dest.liked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} 
                    />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">@{dest.uploadedBy?.name || 'Semperiter'}</p>
                  <p className="text-xs flex items-center">
                    <Heart className="h-3 w-3 mr-1 text-muted-foreground" /> 
                    {dest.likes}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/explorar">Ver más destinos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
