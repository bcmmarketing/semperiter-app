interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isBlocked?: boolean;
  isWarned?: boolean;
  lastLogin?: string;
  registrationDate: string;
  status: 'active' | 'blocked' | 'warned';
}

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
  uploadedBy: User;
  uploadDate: string;
  likes: number;
  views: number;
}

// Usuarios ficticios
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isBlocked: false,
    isWarned: false,
    lastLogin: '2025-03-18T15:30:00Z',
    registrationDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    isBlocked: true,
    isWarned: false,
    lastLogin: '2025-02-20T10:15:00Z',
    registrationDate: '2024-01-20',
    status: 'blocked'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria.rodriguez@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    isBlocked: false,
    isWarned: true,
    lastLogin: '2025-03-17T18:45:00Z',
    registrationDate: '2024-02-01',
    status: 'warned'
  },
  {
    id: '4',
    name: 'Juan Martínez',
    email: 'juan.martinez@example.com',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    isBlocked: false,
    isWarned: false,
    lastLogin: '2025-03-18T17:20:00Z',
    registrationDate: '2024-02-15',
    status: 'active'
  }
];

export const defaultDestinations: Destination[] = [
  // Europa
  {
    id: "paris",
    name: "Torre Eiffel",
    country: "Francia",
    continent: "Europa",
    region: "Île-de-France",
    city: "París",
    category: ["ciudad", "cultura"],
    coordinates: [48.8584, 2.2945],
    description: "Símbolo icónico de París y uno de los monumentos más visitados del mundo.",
    relatedImages: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[0],
    uploadDate: "2024-12-15",
    likes: 245,
    views: 1890
  },
  {
    id: "santorini",
    name: "Oia",
    country: "Grecia",
    continent: "Europa",
    region: "Islas Cícladas",
    city: "Santorini",
    category: ["playa", "cultura"],
    coordinates: [36.4618, 25.3753],
    description: "Famosa por sus casas blancas y azules con vistas al mar Egeo.",
    relatedImages: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[1],
    uploadDate: "2024-11-20",
    likes: 189,
    views: 1456
  },
  {
    id: "colosseum",
    name: "Coliseo",
    country: "Italia",
    continent: "Europa",
    region: "Lacio",
    city: "Roma",
    category: ["ciudad", "cultura"],
    coordinates: [41.8902, 12.4922],
    description: "El anfiteatro más grande del mundo antiguo",
    relatedImages: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[2],
    uploadDate: "2024-10-05",
    likes: 167,
    views: 1234
  },
  {
    id: "sagrada-familia",
    name: "Sagrada Familia",
    country: "España",
    continent: "Europa",
    region: "Cataluña",
    city: "Barcelona",
    category: ["ciudad", "cultura"],
    coordinates: [41.4036, 2.1744],
    description: "Basílica modernista diseñada por Antoni Gaudí",
    relatedImages: [
      "https://images.unsplash.com/photo-1567593810070-7a3d471af022?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[3],
    uploadDate: "2024-09-15",
    likes: 145,
    views: 987
  },
  // Asia
  {
    id: "great-wall",
    name: "Gran Muralla",
    country: "China",
    continent: "Asia",
    region: "Pekín",
    city: "Badaling",
    category: ["cultura", "montaña"],
    coordinates: [40.4319, 116.5704],
    description: "La estructura militar más larga del mundo",
    relatedImages: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[0],
    uploadDate: "2024-08-20",
    likes: 198,
    views: 1567
  },
  {
    id: "petra",
    name: "Petra",
    country: "Jordania",
    continent: "Asia",
    region: "Ma'an",
    city: "Petra",
    category: ["cultura", "montaña"],
    coordinates: [30.3285, 35.4444],
    description: "Ciudad antigua tallada en la roca",
    relatedImages: [
      "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[1],
    uploadDate: "2024-07-10",
    likes: 178,
    views: 1345
  },
  // América
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Perú",
    continent: "América",
    region: "Cusco",
    city: "Aguas Calientes",
    category: ["montaña", "cultura"],
    coordinates: [-13.1631, -72.5450],
    description: "Ciudad perdida de los Incas",
    relatedImages: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1600&h=1200&q=90",
      "default/machu-picchu/2.jpg",
      "default/machu-picchu/3.jpg"
    ],
    uploadedBy: mockUsers[2],
    uploadDate: "2024-06-25",
    likes: 234,
    views: 1789
  },
  {
    id: "grand-canyon",
    name: "Gran Cañón",
    country: "Estados Unidos",
    continent: "América",
    region: "Arizona",
    city: "Grand Canyon Village",
    category: ["montaña", "rural"],
    coordinates: [36.0544, -112.1401],
    description: "Uno de los cañones más espectaculares del mundo",
    relatedImages: [
      "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=1600&h=1200&q=90",
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1600&h=1200&q=90",
      "https://images.unsplash.com/photo-1502375751885-4f494926ce5c?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[3],
    uploadDate: "2024-05-15",
    likes: 156,
    views: 1234
  },
  // África
  {
    id: "pyramids",
    name: "Pirámides de Giza",
    country: "Egipto",
    continent: "África",
    region: "El Cairo",
    city: "Giza",
    category: ["cultura"],
    coordinates: [29.9792, 31.1342],
    description: "Las únicas maravillas del mundo antiguo que perduran",
    relatedImages: [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&h=1200&q=90",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&h=1200&q=90",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&h=1200&q=90"
    ],
    uploadedBy: mockUsers[0],
    uploadDate: "2024-04-10",
    likes: 189,
    views: 1567
  }
];
