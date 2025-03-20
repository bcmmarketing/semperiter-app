
import { useState, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import type { MapContainerProps, TileLayerProps } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

import type { Location } from "@/types/location";

interface UploadMapProps {
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
  readOnly?: boolean;
}

// Custom component to handle map click events
const LocationMarker = ({ 
  onLocationSelect, 
  initialPosition,
  readOnly 
}: { 
  onLocationSelect: (loc: Location) => void;
  initialPosition?: [number, number];
  readOnly?: boolean;
}) => {
  const [position, setPosition] = useState<[number, number] | null>(initialPosition || null);

  const map = useMapEvents({
    click(e) {
      if (readOnly) return;
      
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Get approximate address (in a real app you'd use reverse geocoding)
      const location = {
        lat,
        lng,
        address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      };
      
      onLocationSelect(location);
    }
  });

  // Si hay una posición inicial, centra el mapa en ella
  useEffect(() => {
    if (initialPosition) {
      map.setView(initialPosition, 12);
    }
  }, [initialPosition, map]);

  return position === null ? null : (
    <Marker position={position} />
  );
}

const UploadMap = ({ onLocationSelect, initialLocation, readOnly = false }: UploadMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  }, [onLocationSelect]);

  return (
    <div className="relative h-full w-full">
      <MapContainer 
        {...{
          center: initialLocation ? [initialLocation.lat, initialLocation.lng] : [40.416775, -3.703790],
          zoom: initialLocation ? 12 : 5,
          style: { height: "100%", width: "100%" },
          dragging: !readOnly,
          touchZoom: !readOnly,
          doubleClickZoom: !readOnly,
          scrollWheelZoom: !readOnly,
          boxZoom: !readOnly,
          attributionControl: true
        } as MapContainerProps}
      >
        <TileLayer
          {...{
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            maxZoom: 19
          } as TileLayerProps}
        />
        <LocationMarker 
          onLocationSelect={handleLocationSelect}
          initialPosition={initialLocation ? [initialLocation.lat, initialLocation.lng] : undefined}
          readOnly={readOnly}
        />
      </MapContainer>
      
      {selectedLocation && !readOnly && (
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 z-[1000]">
          <p className="text-sm font-medium">Ubicación seleccionada:</p>
          <p className="text-xs">{selectedLocation.address}</p>
        </div>
      )}
      
      {!readOnly && (
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 z-[1000]">
          <p className="text-xs">Haz clic para marcar una ubicación</p>
        </div>
      )}
    </div>
  );
};

export default UploadMap;
