export const getImageUrl = (imageUrl?: string, filename?: string, defaultImage: string = '/placeholder.jpg') => {
  if (imageUrl?.startsWith('http')) {
    return imageUrl;
  }
  
  if (imageUrl) {
    return imageUrl.startsWith('default/') ? `/images/${imageUrl}` : `/uploads/${imageUrl}`;
  }

  if (filename) {
    return filename.startsWith('default/') ? `/images/${filename}` : `/uploads/${filename}`;
  }

  return defaultImage;
};
