import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UploadFormData {
  country: string;
  continent?: string;
  region?: string;
  city?: string;
  title: string;
  blurFaces: boolean;
  photos: FileList | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const Upload = () => {
  const [formData, setFormData] = useState<UploadFormData>({
    country: '',
    continent: '',
    region: '',
    city: '',
    title: '',
    blurFaces: false,
    photos: null
  });
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();



  const continents = [
    'África', 'América del Norte', 'América del Sur', 'Asia', 
    'Europa', 'Oceanía', 'Antártida'
  ];

  const countries = [
    'Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda', 'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia',
    'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bangladés', 'Barbados', 'Baréin', 'Bélgica', 'Belice', 'Benín', 'Bielorrusia',
    'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután',
    'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'Chile', 'China', 'Chipre', 'Colombia', 'Comoras', 'Congo',
    'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador',
    'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia',
    'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia', 'Guatemala',
    'Guinea', 'Guinea-Bisáu', 'Guinea Ecuatorial', 'Guyana', 'Haití', 'Honduras', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán',
    'Irlanda', 'Islandia', 'Islas Marshall', 'Islas Salomón', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán',
    'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein',
    'Lituania', 'Luxemburgo', 'Macedonia del Norte', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta', 'Marruecos',
    'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Mozambique', 'Namibia',
    'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 'Países Bajos', 'Pakistán', 'Palaos',
    'Palestina', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Reino Unido', 'República Centroafricana',
    'República Checa', 'República Democrática del Congo', 'República Dominicana', 'Ruanda', 'Rumanía', 'Rusia', 'Samoa',
    'San Cristóbal y Nieves', 'San Marino', 'San Vicente y las Granadinas', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán',
    'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania', 'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga',
    'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu',
    'Vaticano', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'
  ].sort();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPhotos: File[] = [];
    const newPreviewUrls: string[] = [];

    Array.from(files).forEach(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Formato no válido",
          description: `${file.name} debe ser JPEG o PNG.`,
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "Archivo demasiado grande",
          description: `${file.name} debe ser menor de 10MB.`,
        });
        return;
      }

      newPhotos.push(file);
      newPreviewUrls.push(URL.createObjectURL(file));
    });

    setSelectedPhotos([...selectedPhotos, ...newPhotos]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setFormData({ ...formData, photos: files });
  };

  const handleUpload = async () => {
    if (!formData.country || !formData.title || !selectedPhotos.length) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "Por favor, completa el país, título y selecciona al menos una foto.",
      });
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();

    // Añadir datos del formulario
    uploadData.append('country', formData.country);
    uploadData.append('title', formData.title);
    uploadData.append('blurFaces', String(formData.blurFaces));
    if (formData.continent) uploadData.append('continent', formData.continent);
    if (formData.region) uploadData.append('region', formData.region);
    if (formData.city) uploadData.append('city', formData.city);

    // Añadir fotos
    selectedPhotos.forEach((photo, index) => {
      uploadData.append(`photos`, photo);
    });

    try {
      const response = await fetch('http://localhost:3005/api/photos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Error al subir las imágenes');
      }

      toast({
        title: "¡Éxito!",
        description: "Las imágenes se han subido y están pendientes de aprobación.",
      });

      // Resetear formulario
      setFormData({
        country: '',
        continent: '',
        region: '',
        city: '',
        title: '',
        blurFaces: false,
        photos: null
      });
      setSelectedPhotos([]);
      setPreviewUrls([]);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ha ocurrido un error al subir las imágenes.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent">
          Subir Fotos
        </h1>
        
        <div className="bg-card rounded-lg shadow-lg p-6 border">
          {/* Sección de subida de fotos */}
          <div className="mb-8 text-center">
            <div className="max-w-xl mx-auto">
              <Label htmlFor="photo-upload" className="text-xl font-semibold block mb-4">
                Subir fotos *
              </Label>
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 hover:border-brand-blue dark:hover:border-brand-yellow transition-colors cursor-pointer" 
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple
                />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      Arrastra tus fotos aquí o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formatos permitidos: JPEG, PNG. Tamaño máximo: 10MB por foto
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <Card className="mt-6 max-w-4xl mx-auto">
                <CardContent className="p-4">
                  <Label className="text-lg font-medium mb-3 block">Fotos seleccionadas:</Label>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="grid grid-cols-4 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md transition-transform group-hover:scale-105"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newPhotos = selectedPhotos.filter((_, i) => i !== index);
                              const newUrls = previewUrls.filter((_, i) => i !== index);
                              setSelectedPhotos(newPhotos);
                              setPreviewUrls(newUrls);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Formulario de datos */}
          <div className="max-w-xl mx-auto space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-semibold">Título de la presentación *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título descriptivo"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="country" className="text-base font-semibold">País *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="continent" className="text-base">Continente (opcional)</Label>
              <Select
                value={formData.continent || ''}
                onValueChange={(value) => setFormData({ ...formData, continent: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un continente" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map((continent) => (
                    <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region" className="text-base">Región/Estado (opcional)</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="Ej: Cataluña"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="city" className="text-base">Ciudad/Zona (opcional)</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ej: Barcelona"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="blurFaces"
                checked={formData.blurFaces}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, blurFaces: checked as boolean })
                }
              />
              <Label htmlFor="blurFaces" className="text-sm">
                Difuminar caras automáticamente
              </Label>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleUpload}
                disabled={!selectedPhotos.length || !formData.country || !formData.title || isUploading}
                className="w-full bg-brand-green hover:bg-brand-green/90 text-white dark:bg-brand-pink dark:hover:bg-brand-pink/90 h-12 text-lg"
              >
                {isUploading ? "Subiendo..." : `Subir ${selectedPhotos.length} foto${selectedPhotos.length !== 1 ? 's' : ''}`}
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Las fotos quedarán pendientes de aprobación por un administrador
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
