import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from './auth';

const router = express.Router();
const prisma = new PrismaClient();

// Configurar multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    // Crear el directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Configurar el filtro de archivos
const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten JPEG y PNG.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Endpoint para subir fotos
// Endpoint para subir fotos
router.post('/upload', authMiddleware, upload.array('photos', 10), async (req: any, res) => {
  try {
    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return res.status(400).json({ error: 'No se han proporcionado archivos' });
    }

    const files = (Array.isArray(req.files) ? req.files : [req.files]) as Express.Multer.File[];
    const { country, title, continent, region, city, blurFaces, latitude, longitude } = req.body;

    // Guardar cada foto en la base de datos
    const savedPhotos = await Promise.all(
      files.map(async (file) => {
        return await prisma.photo.create({
          data: {
            filename: file.filename,
            originalName: file.originalname,
            title,
            country,
            continent,
            region,
            city,
            blurFaces: blurFaces === 'true',
            status: 'pending',
            userId: req.user.id,
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null
          }
        });
      })
    );

    res.status(200).json({
      message: 'Archivos subidos correctamente',
      files: savedPhotos
    });
  } catch (error) {
    console.error('Error al subir archivos:', error);
    res.status(500).json({ error: 'Error al procesar la subida de archivos' });
  }
});

// Endpoint para obtener fotos pendientes
router.get('/pending', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const pendingPhotos = await prisma.photo.findMany({
      where: { status: 'pending' },
      include: { user: true }
    });
    res.json(pendingPhotos);
  } catch (error) {
    console.error('Error al obtener fotos pendientes:', error);
    res.status(500).json({ error: 'Error al obtener las fotos pendientes' });
  }
});

// Endpoint para aprobar una foto
router.post('/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await prisma.photo.update({
      where: { id },
      data: { status: 'approved' },
      include: { user: true }
    });
    res.json(updatedPhoto);
  } catch (error) {
    console.error('Error al aprobar la foto:', error);
    res.status(500).json({ error: 'Error al aprobar la foto' });
  }
});

// Endpoint para rechazar una foto
router.post('/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await prisma.photo.update({
      where: { id },
      data: { status: 'rejected' },
      include: { user: true }
    });
    res.json(updatedPhoto);
  } catch (error) {
    console.error('Error al rechazar la foto:', error);
    res.status(500).json({ error: 'Error al rechazar la foto' });
  }
});

// Endpoint para buscar fotos
router.get('/search', async (req, res) => {
  try {
    const { continent, country, region, city } = req.query;

    const where: any = {
      status: 'approved'
    };

    if (continent) where.continent = continent;
    if (country) where.country = country;
    if (region) where.region = region;
    if (city) where.city = city;

    const photos = await prisma.photo.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Transformar las fotos para incluir las coordenadas en el formato correcto
    const transformedPhotos = photos.map(photo => ({
      ...photo,
      coordinates: photo.latitude && photo.longitude ? [photo.latitude, photo.longitude] as [number, number] : undefined
    }));

    // Si no hay fotos, usar los destinos por defecto que coincidan con los filtros
    if (transformedPhotos.length === 0) {
      // Importar los destinos por defecto
      const { defaultDestinations } = await import('../../lib/defaultDestinations');
      let filteredDestinations = [...defaultDestinations];

      if (continent) {
        filteredDestinations = filteredDestinations.filter(d => d.continent === continent);
      }
      if (country) {
        filteredDestinations = filteredDestinations.filter(d => d.country === country);
      }
      if (region) {
        filteredDestinations = filteredDestinations.filter(d => d.region === region);
      }
      if (city) {
        filteredDestinations = filteredDestinations.filter(d => d.city === city);
      }

      const defaultPhotos = filteredDestinations.map(dest => ({
        id: dest.id,
        title: dest.name,
        filename: `default/${dest.id}.jpg`,
        country: dest.country,
        continent: dest.continent,
        region: dest.region,
        city: dest.city,
        status: 'approved',
        description: dest.description,
        user: {
          name: 'Semperiter',
          email: 'info@semperiter.com'
        },
        coordinates: dest.coordinates
      }));

      return res.json(defaultPhotos);
    }

    res.json(transformedPhotos);
  } catch (error) {
    console.error('Error searching photos:', error);
    res.status(500).json({ error: 'Error al buscar fotos' });
  }
});

// Obtener una foto específica
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await prisma.photo.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!photo) {
      return res.status(404).json({ error: 'Foto no encontrada' });
    }

    res.json(photo);
  } catch (error) {
    console.error('Error getting photo:', error);
    res.status(500).json({ error: 'Error al obtener la foto' });
  }
});

export default router;
