import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface DestinationMapProps {
  latitude: number;
  longitude: number;
  label: string;
}

const DestinationMap = ({ latitude, longitude, label }: DestinationMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Inicializar el mapa
    const map = L.map(mapContainerRef.current).setView([latitude, longitude], 13);
    
    // Añadir capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Crear icono personalizado
    const customIcon = L.divIcon({
      className: 'bg-white p-2 rounded-lg shadow-lg flex items-center',
      html: `
        <div class="flex items-center gap-2 px-3 py-1.5">
          <span class="text-brand-navy">📍</span>
          <span class="font-medium whitespace-nowrap">${label}</span>
        </div>
      `,
      iconSize: [200, 40],
      iconAnchor: [100, 40]
    });

    // Añadir marcador
    L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

    mapRef.current = map;

    // Limpiar al desmontar
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, label]);

  return (
    <div ref={mapContainerRef} className="w-full h-[400px] rounded-lg border" />
  );
};

export default DestinationMap;
