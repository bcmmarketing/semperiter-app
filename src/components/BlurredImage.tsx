import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

interface BlurredImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function BlurredImage({ src, alt, className, loading = 'eager', onError }: BlurredImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading face detection models:', error);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!imageRef.current || !canvasRef.current || !modelsLoaded || !isLoaded) return;

    const processImage = async () => {
      const img = imageRef.current!;
      const canvas = canvasRef.current!;
      const container = canvas.parentElement;
      
      if (!container) return;
      
      // Obtener el tamaño del contenedor
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Calcular el ratio de aspecto de la imagen
      const imageRatio = img.naturalWidth / img.naturalHeight;
      const containerRatio = containerWidth / containerHeight;
      
      // Ajustar el canvas al tamaño del contenedor manteniendo la relación de aspecto
      if (imageRatio > containerRatio) {
        canvas.width = containerWidth;
        canvas.height = containerWidth / imageRatio;
      } else {
        canvas.height = containerHeight;
        canvas.width = containerHeight * imageRatio;
      }
      
      // Dibujar la imagen original en el canvas
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Detectar caras
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
      
      // Calcular el factor de escala entre la imagen original y el canvas
      const scaleX = canvas.width / img.naturalWidth;
      const scaleY = canvas.height / img.naturalHeight;
      
      // Aplicar pixelado solo a las caras detectadas
      detections.forEach(detection => {
        // Ajustar las coordenadas de la cara según la escala del canvas
        const scaledBox = {
          x: detection.box.x * scaleX,
          y: detection.box.y * scaleY,
          width: detection.box.width * scaleX,
          height: detection.box.height * scaleY
        };
        
        const { x, y, width, height } = scaledBox;
        
        // Obtener los datos de la cara
        const faceData = ctx.getImageData(x, y, width, height);
        
        // Tamaño de los píxeles para el efecto (ajustado según el tamaño de la cara)
        const pixelSize = Math.max(width, height) / 20;
        
        // Aplicar efecto de pixelado solo al área de la cara
        for (let px = 0; px < width; px += pixelSize) {
          for (let py = 0; py < height; py += pixelSize) {
            const pixelX = x + px;
            const pixelY = y + py;
            const pixelWidth = Math.min(pixelSize, width - px);
            const pixelHeight = Math.min(pixelSize, height - py);
            
            // Obtener el color promedio del área
            const avgColor = getAverageColor(ctx, pixelX, pixelY, pixelWidth, pixelHeight);
            
            // Dibujar el pixel con el color promedio
            ctx.fillStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${avgColor.a})`;
            ctx.fillRect(pixelX, pixelY, pixelWidth, pixelHeight);
          }
        }
      });
    };

    processImage();
  }, [modelsLoaded, isLoaded]);

  const getAverageColor = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0, a = 0;
    const total = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      a += data[i + 3];
    }
    
    return {
      r: Math.round(r / total),
      g: Math.round(g / total),
      b: Math.round(b / total),
      a: Math.round(a / total) / 255
    };
  };

  return (
    <div className="relative w-full h-full">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        style={{ display: 'none' }}
        onLoad={() => setIsLoaded(true)}
        onError={onError}
      />
      <canvas
        ref={canvasRef}
        className={className}
      />
    </div>
  );
}
