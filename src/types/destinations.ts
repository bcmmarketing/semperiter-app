export interface Destination {
  id: string;
  name: string;
  city?: string;
  country?: string;
  continent?: string;
  coordinates: [number, number];
  description: string;
  relatedImages: string[];
  uploadedBy?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  uploadDate: string;
  likes: number;
  views: number;
  category?: string[];
  status: string;
}
