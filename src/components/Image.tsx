import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function Image({ src, alt, className, loading = 'lazy', onError }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={onError}
    />
  );
}
