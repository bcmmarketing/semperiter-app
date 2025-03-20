import { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/Image";
import { getImageUrl } from "@/lib/utils/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ExploreMap.css';
import ErrorBoundary from './ErrorBoundary';

// Fix for default markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultCenter: LatLngExpression = [40.416775, -3.703790];
const defaultZoom = 4;

interface Location {
  id: string;
  title: string;
  location?: string;
  coordinates?: [number, number];
  likes?: number;
  user?: {
    name: string;
    email: string;
  };
  imageUrl?: string;
  filename?: string;
}

interface ExploreMapProps {
  locations: Location[];
}

const ExploreMap = ({ locations }: ExploreMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handlePopupClose = () => {
    setSelectedLocation(null);
  };

  return (
    <ErrorBoundary>
      <div className="relative rounded-lg overflow-hidden" style={{ height: "70vh" }}>
        <MapContainer 
          style={{ height: "100%", width: "100%" }}
          {...{
            center: defaultCenter,
            zoom: defaultZoom,
            scrollWheelZoom: true
          } as any}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map(location => (
            <Marker 
              key={location.id} 
              position={[location.coordinates[0], location.coordinates[1]]}
              {...{ icon: DefaultIcon } as any}
              eventHandlers={{
                click: () => handleLocationClick(location)
              }}
            >
              {selectedLocation?.id === location.id && (
                <Popup
                  eventHandlers={{
                    remove: handlePopupClose
                  }}
                >
                    <div className="w-80 p-0">
                      <div className="flex flex-col">
                        <div className="w-full h-48">
                          <Image 
                            src={location.imageUrl} 
                            alt={location.title}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.jpg';
                            }}
                          />
                        </div>
                        <div className="w-full p-4">
                          <h4 className="font-medium text-lg">{location.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{location.location}</p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-sm">❤️ {location.likes || 0}</Badge>
                            <span className="text-sm text-muted-foreground">@{location.user?.name || 'Semperiter'}</span>
                          </div>
                          <Link 
                            to={`/destino/${location.id}`}
                            className="w-full"
                          >
                            <Button 
                              className="w-full" 
                              size="sm"
                            >
                              Ver destino
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
        </MapContainer>
      </div>
    </ErrorBoundary>
  );
};

export default ExploreMap;
