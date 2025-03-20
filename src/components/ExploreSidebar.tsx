import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryType = "playa" | "montaña" | "ciudad" | "rural" | "cultura" | "gastronomía";
type ContinentType = "Europa" | "Asia" | "América" | "África" | "Oceanía";

const continentOptions = ["Europa", "Asia", "América", "África", "Oceanía"];

const ExploreSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedContinent, setSelectedContinent] = useState<string>(searchParams.get("continent") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [region, setRegion] = useState(searchParams.get("region") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [categories, setCategories] = useState<CategoryType[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) as CategoryType[] || []
  );

  const categoryOptions: { id: CategoryType; label: string }[] = [
    { id: "playa", label: "Playa" },
    { id: "montaña", label: "Montaña" },
    { id: "ciudad", label: "Ciudad" },
    { id: "rural", label: "Rural" },
    { id: "cultura", label: "Cultura" },
    { id: "gastronomía", label: "Gastronomía" },
  ];

  const handleCategoryChange = (category: CategoryType) => {
    setCategories(
      categories.includes(category)
        ? categories.filter(c => c !== category)
        : [...categories, category]
    );
  };

  const handleContinentChange = (value: string) => {
    setSelectedContinent(value);
    setCountry("");
    setRegion("");
    setCity("");
  };
  
  const handleClearFilters = () => {
    setSearchTerm("");
    setCategories([]);
    setSelectedContinent("");
    setCountry("");
    setRegion("");
    setCity("");
    setSearchParams({});
  };

  const handleApplyFilters = () => {
    const params: Record<string, string> = {};
    if (searchTerm) params.search = searchTerm;
    if (categories.length > 0) params.categories = categories.join(",");
    if (selectedContinent) params.continent = selectedContinent;
    if (country) params.country = country;
    if (region) params.region = region;
    if (city) params.city = city;
    setSearchParams(params);
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 rounded-lg border dark:border-slate-700 shadow-sm p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-lg dark:text-slate-200">Filtros</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="h-8 text-xs dark:text-slate-400 dark:hover:bg-slate-800"
        >
          Limpiar filtros
        </Button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <Label htmlFor="search" className="dark:text-slate-300">Buscar por lugar o usuario</Label>
        <div className="relative mt-1">
          <Input
            id="search"
            type="text"
            placeholder="París, Francia, Europa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-8"
          />
          <div className="absolute right-2 top-2.5 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <Label className="mb-2 block dark:text-slate-300">Categorías</Label>
        <div className="grid grid-cols-2 gap-2">
          {categoryOptions.map((category) => (
            <div key={category.id} className="flex items-start space-x-2">
              <Checkbox 
                id={`category-${category.id}`} 
                checked={categories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label 
                htmlFor={`category-${category.id}`}
                className="font-normal dark:text-slate-400"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Selectors */}
      <div className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label className="dark:text-slate-300">Continente</Label>
          <Select value={selectedContinent} onValueChange={handleContinentChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un continente" />
            </SelectTrigger>
            <SelectContent>
              {continentOptions.map((continent) => (
                <SelectItem key={continent} value={continent}>
                  {continent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="dark:text-slate-300">País</Label>
          <Input
            type="text"
            placeholder="Escribe un país..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="dark:text-slate-300">Región</Label>
          <Input
            type="text"
            placeholder="Escribe una región..."
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="dark:text-slate-300">Ciudad</Label>
          <Input
            type="text"
            placeholder="Escribe una ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      
      {/* Apply Filters Button */}
      <Button className="w-full mt-6 bg-brand-green hover:bg-brand-green/90 text-white" onClick={handleApplyFilters}>
        Aplicar Filtros
      </Button>
    </div>
  );
};

export default ExploreSidebar;
