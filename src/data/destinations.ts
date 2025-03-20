export interface Destination {
  id: string;
  title: string;
  location: string;
  user: string;
  likes: number;
  imageUrl: string;
  category: string;
  coordinates: [number, number];
  description: string;
  tags: string[];
}

export const destinations: Destination[] = [
  // EUROPA

  {
    id: "1",
    title: "Santorini al Atardecer",
    location: "Santorini, Grecia",
    user: "mediterraneo",
    likes: 542,
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
    category: "ciudad",
    coordinates: [36.3932, 25.4615],
    description: "Las icónicas casas blancas y azules de Santorini durante un espectacular atardecer",
    tags: ["isla", "mediterráneo", "arquitectura", "atardecer"]
  },
  {
    id: "2",
    title: "Torre Eiffel",
    location: "París, Francia",
    user: "travelista",
    likes: 182,
    imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    category: "ciudad",
    coordinates: [48.8584, 2.2945],
    description: "El símbolo más icónico de París",
    tags: ["ciudad", "monumento", "arquitectura", "romántico"]
  },
  {
    id: "3",
    title: "Coliseo Romano",
    location: "Roma, Italia",
    user: "mundoviajero",
    likes: 310,
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    category: "cultura",
    coordinates: [41.8902, 12.4922],
    description: "El anfiteatro más grande jamás construido",
    tags: ["cultura", "historia", "arquitectura", "antiguo"]
  },
  {
    id: "4",
    title: "Atardecer en Santorini",
    location: "Santorini, Grecia",
    user: "viajerosfelices",
    likes: 428,
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    category: "playa",
    coordinates: [36.3932, 25.4615],
    description: "Impresionantes vistas del atardecer sobre el mar Egeo",
    tags: ["playa", "isla", "atardecer", "romántico"]
  },
  {
    id: "5",
    title: "Montañas de Suiza",
    location: "Interlaken, Suiza",
    user: "alpinista",
    likes: 156,
    imageUrl: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95",
    category: "montaña",
    coordinates: [46.6863, 7.8632],
    description: "Paisajes alpinos entre dos lagos",
    tags: ["montaña", "naturaleza", "aventura", "nieve"]
  },
  {
    id: "6",
    title: "Mercado local",
    location: "Bangkok, Tailandia",
    user: "foodtraveler",
    likes: 198,
    imageUrl: "https://images.unsplash.com/photo-1516992654410-9309d4587e94",
    category: "gastronomía",
    coordinates: [13.7563, 100.5018],
    description: "Auténtica experiencia gastronómica tailandesa",
    tags: ["gastronomía", "cultura", "mercado", "comida"]
  },
  {
    id: "7",
    title: "Machu Picchu",
    location: "Cusco, Perú",
    user: "andinista",
    likes: 520,
    imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    category: "cultura",
    coordinates: [-13.1631, -72.5450],
    description: "La ciudad perdida de los Incas",
    tags: ["cultura", "historia", "montaña", "arqueología"]
  },
  {
    id: "8",
    title: "Aurora Boreal",
    location: "Tromsø, Noruega",
    user: "nordiclight",
    likes: 342,
    imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
    category: "naturaleza",
    coordinates: [69.6492, 18.9553],
    description: "Espectáculo de luces naturales en el Ártico",
    tags: ["naturaleza", "noche", "invierno", "ártico"]
  },
  {
    id: "9",
    title: "Gran Barrera de Coral",
    location: "Queensland, Australia",
    user: "divemagazine",
    likes: 289,
    imageUrl: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0",
    category: "naturaleza",
    coordinates: [-18.2871, 147.6992],
    description: "El mayor arrecife de coral del mundo",
    tags: ["naturaleza", "mar", "buceo", "vida marina"]
  },
  {
    id: "10",
    title: "Desierto del Sahara",
    location: "Merzouga, Marruecos",
    user: "desertlover",
    likes: 267,
    imageUrl: "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee",
    category: "aventura",
    coordinates: [31.0451, -4.0083],
    description: "Dunas infinitas en el desierto más grande del mundo",
    tags: ["aventura", "desierto", "naturaleza", "paisaje"]
  },
  {
    id: "11",
    title: "Templo Dorado",
    location: "Kioto, Japón",
    user: "zenmoments",
    likes: 412,
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    category: "cultura",
    coordinates: [35.0395, 135.7290],
    description: "Pabellón cubierto de oro puro",
    tags: ["cultura", "templo", "arquitectura", "jardín"]
  },
  {
    id: "12",
    title: "Cascadas de Iguazú",
    location: "Misiones, Argentina",
    user: "naturepics",
    likes: 378,
    imageUrl: "https://images.unsplash.com/photo-1577587230708-187fdbef4d91",
    category: "naturaleza",
    coordinates: [-25.6953, -54.4367],
    description: "Una de las maravillas naturales del mundo",
    tags: ["naturaleza", "cascada", "selva", "paisaje"]
  }
];
