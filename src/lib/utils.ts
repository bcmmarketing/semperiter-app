import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (imageUrl?: string, filename?: string, defaultImage: string = '/images/default/placeholder.jpg') => {
  try {
    if (!imageUrl && !filename) {
      return defaultImage;
    }

    if (imageUrl?.startsWith('http')) {
      return imageUrl;
    }

    const path = imageUrl || filename;
    if (path?.startsWith('default/')) {
      return `/images/${path}`;
    }

    if (path?.startsWith('https://images.unsplash.com/')) {
      return path;
    }

    return path ? `/uploads/${path}` : defaultImage;
  } catch (error) {
    console.error('Error in getImageUrl:', error);
    return defaultImage;
  }
}
