import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit2, Save, X, Trash2, Eye, Heart, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { defaultDestinations } from "@/lib/defaultDestinations";
import { Image } from "@/components/Image";
import { getImageUrl } from "@/lib/utils/image";

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  region: string;
  city: string;
  category: string[];
  coordinates: [number, number];
  description: string;
  relatedImages?: string[];
  uploadedBy: {
    name: string;
    email: string;
    avatar?: string;
  };
  uploadDate: string;
  likes: number;
  views: number;
}

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>(defaultDestinations);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredDestinations = destinations.filter(destination => {
    const searchLower = searchTerm.toLowerCase();
    return destination.name.toLowerCase().includes(searchLower) ||
           destination.uploadedBy.name.toLowerCase().includes(searchLower);
  });



  const handleStartEdit = (destination: Destination) => {
    setEditingId(destination.id);
    setEditValue(destination.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editValue.trim() || editValue === destinations.find(d => d.id === id)?.name) {
      handleCancelEdit();
      return;
    }

    try {
      setDestinations(destinations.map(d => 
        d.id === id ? { ...d, name: editValue } : d
      ));
      toast({
        title: "Destino actualizado",
        description: `El destino ha sido actualizado correctamente.`
      });
    } catch (error: any) {
      console.error("Error updating destination:", error);
      toast({
        variant: "destructive",
        title: "Error al actualizar destino",
        description: "No se pudo actualizar el destino"
      });
    } finally {
      handleCancelEdit();
    }
  };

  const handleDeleteDestination = (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este destino?")) {
      return;
    }

    try {
      setDestinations(destinations.filter((d) => d.id !== id));
      toast({
        title: "Destino eliminado",
        description: "El destino ha sido eliminado correctamente."
      });
    } catch (error: any) {
      console.error("Error deleting destination:", error);
      toast({
        variant: "destructive",
        title: "Error al eliminar destino",
        description: "No se pudo eliminar el destino"
      });
    }
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Destinos</h2>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre de destino o usuario..."
          className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDestinations.map((destination) => (
          <Card key={destination.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image 
                src={getImageUrl(destination.relatedImages?.[0], `default/${destination.id}.jpg`)}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.jpg';
                }}
              />
              <div className="absolute top-3 right-3 flex flex-wrap gap-2 max-w-[70%]">
                {destination.category.map((cat, index) => (
                  <Badge key={index} variant="secondary" className="bg-black/50 text-white hover:bg-black/60">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  {editingId === destination.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveEdit(destination.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">{destination.name}</CardTitle>
                        <CardDescription>
                          {destination.city}, {destination.country}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStartEdit(destination)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDestination(destination.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={destination.uploadedBy.avatar ? (destination.uploadedBy.avatar.startsWith('http') ? destination.uploadedBy.avatar : (destination.uploadedBy.avatar.startsWith('default/') ? `/images/${destination.uploadedBy.avatar}` : `/uploads/${destination.uploadedBy.avatar}`)) : '/default-avatar.jpg'} 
                    alt={destination.uploadedBy.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-avatar.jpg';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate dark:text-slate-300">
                    @{destination.uploadedBy.name}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(destination.uploadDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{destination.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{destination.views.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
