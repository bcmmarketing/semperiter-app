import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Location } from "@/types/location";

interface LocationComboboxProps {
  onLocationSelect: (location: Location) => void;
}

const mockLocations = [
  // Europa
  {
    address: "Madrid, España",
    lat: 40.416775,
    lng: -3.703790
  },
  {
    address: "París, Francia",
    lat: 48.856614,
    lng: 2.352222
  },
  {
    address: "Londres, Reino Unido",
    lat: 51.507351,
    lng: -0.127758
  },
  {
    address: "Roma, Italia",
    lat: 41.902783,
    lng: 12.496366
  },
  // América
  {
    address: "Nueva York, Estados Unidos",
    lat: 40.712776,
    lng: -74.005974
  },
  {
    address: "Ciudad de México, México",
    lat: 19.432608,
    lng: -99.133208
  },
  {
    address: "Río de Janeiro, Brasil",
    lat: -22.906847,
    lng: -43.172897
  },
  // Asia
  {
    address: "Tokio, Japón",
    lat: 35.689487,
    lng: 139.691706
  },
  {
    address: "Pekín, China",
    lat: 39.904200,
    lng: 116.407396
  },
  {
    address: "Bangkok, Tailandia",
    lat: 13.756331,
    lng: 100.501765
  },
  // África
  {
    address: "El Cairo, Egipto",
    lat: 30.044420,
    lng: 31.235712
  },
  {
    address: "Ciudad del Cabo, Sudáfrica",
    lat: -33.924869,
    lng: 18.424055
  },
  // Oceanía
  {
    address: "Sídney, Australia",
    lat: -33.868820,
    lng: 151.209296
  },
  {
    address: "Auckland, Nueva Zelanda",
    lat: -36.848460,
    lng: 174.763332
  }
];

export function LocationCombobox({ onLocationSelect }: LocationComboboxProps) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locations] = useState<Location[]>(mockLocations);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLocations = locations
    .filter(location => 
      location.address.toLowerCase().includes(value.toLowerCase())
    )
    .sort((a, b) => {
      // Priorizar las ubicaciones que empiezan con el texto buscado
      const aStartsWith = a.address.toLowerCase().startsWith(value.toLowerCase());
      const bStartsWith = b.address.toLowerCase().startsWith(value.toLowerCase());
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return 0;
    })
    .slice(0, 5); // Limitar a 5 resultados para no sobrecargar la interfaz

  const handleLocationSelect = (location: Location) => {
    setValue(location.address);
    onLocationSelect(location);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Busca una ciudad (ej: Nueva York, Tokio, París...)"
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {showSuggestions && filteredLocations.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
          {filteredLocations.map((location) => (
            <div
              key={location.address}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleLocationSelect(location)}
            >
              {location.address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
