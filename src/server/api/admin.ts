import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Obtener estadísticas generales
router.get('/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [
      totalPhotos,
      totalUsers,
      pendingPhotos,
      locationStats
    ] = await Promise.all([
      prisma.photo.count(),
      prisma.user.count(),

      prisma.photo.count({ where: { status: 'pending' } }),
      prisma.photo.groupBy({
        by: ['country'],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        },
        take: 5
      })
    ]);

    const formattedLocationStats = locationStats.map((stat: { country: string, _count: { id: number } }) => ({
      location: stat.country,
      count: stat._count.id
    }));

    res.json({
      totalPhotos,
      totalUsers,
      totalLikes: 0,
      pendingPhotos,
      locationStats: formattedLocationStats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Obtener fotos pendientes de aprobación
router.get('/photos/pending', authenticateToken, isAdmin, async (req, res) => {
  try {
    const pendingPhotos = await prisma.photo.findMany({
      where: { status: 'pending' },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(pendingPhotos);
  } catch (error) {
    console.error('Error getting pending photos:', error);
    res.status(500).json({ error: 'Error al obtener fotos pendientes' });
  }
});

// Moderar una foto
router.patch('/photos/:id/moderate', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const photo = await prisma.photo.update({
      where: { id },
      data: { status }
    });

    res.json(photo);
  } catch (error) {
    console.error('Error moderating photo:', error);
    res.status(500).json({ error: 'Error al moderar la foto' });
  }
});

export default router;
