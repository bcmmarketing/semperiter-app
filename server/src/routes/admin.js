const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const User = require('../models/user');
const Photo = require('../models/photo');
const { Op } = require('sequelize');

// Obtener estadísticas detalladas
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    // Obtener estadísticas básicas
    let totalPhotos = 0;
    let totalUsers = 0;
    let totalLikes = 0;
    let pendingPhotos = 0;
    let approvedPhotos = 0;
    let rejectedPhotos = 0;
    let activeUsers = 0;
    let blockedUsers = 0;
    
    try {
      totalPhotos = await Photo.count();
    } catch (e) {
      console.error('Error contando fotos:', e);
    }
    
    try {
      totalUsers = await User.count({ where: { role: 'user' } });
    } catch (e) {
      console.error('Error contando usuarios:', e);
    }
    
    try {
      const likesResult = await Photo.sum('likes');
      totalLikes = likesResult || 0;
    } catch (e) {
      console.error('Error sumando likes:', e);
    }
    
    try {
      pendingPhotos = await Photo.count({ where: { status: 'pending' } });
    } catch (e) {
      console.error('Error contando fotos pendientes:', e);
    }
    
    try {
      approvedPhotos = await Photo.count({ where: { status: 'approved' } });
    } catch (e) {
      console.error('Error contando fotos aprobadas:', e);
    }
    
    try {
      rejectedPhotos = await Photo.count({ where: { status: 'rejected' } });
    } catch (e) {
      console.error('Error contando fotos rechazadas:', e);
    }
    
    try {
      activeUsers = await User.count({ where: { role: 'user', isBlocked: false } });
    } catch (e) {
      console.error('Error contando usuarios activos:', e);
    }
    
    try {
      blockedUsers = await User.count({ where: { role: 'user', isBlocked: true } });
    } catch (e) {
      console.error('Error contando usuarios bloqueados:', e);
    }
    
    // Estadísticas de ubicaciones
    let locationStats = [];
    try {
      const locations = await Photo.findAll({
        attributes: ['location', [sequelize.fn('count', sequelize.col('id')), 'count']],
        group: ['location'],
        where: { status: 'approved' },
        order: [[sequelize.fn('count', sequelize.col('id')), 'DESC']],
        limit: 10,
        raw: true
      });
      
      locationStats = locations.map(stat => ({
        location: stat.location || 'Desconocido',
        count: parseInt(stat.count)
      }));
    } catch (e) {
      console.error('Error obteniendo estadísticas de ubicaciones:', e);
    }
    
    // Actividad reciente
    let recentActivity = [];
    try {
      recentActivity = await Photo.findAll({
        attributes: ['id', 'title', 'status', 'createdAt'],
        order: [['createdAt', 'DESC']],
        limit: 5,
        raw: true
      });
      
      // Añadir información de usuario simulada si no hay relación
      recentActivity = recentActivity.map(activity => ({
        ...activity,
        user: { name: 'Usuario' }
      }));
    } catch (e) {
      console.error('Error obteniendo actividad reciente:', e);
    }

    res.json({
      totalPhotos,
      totalUsers,
      totalLikes,
      pendingPhotos,
      approvedPhotos,
      rejectedPhotos,
      activeUsers,
      blockedUsers,
      locationStats,
      recentActivity
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Listar todas las fotos con paginación y filtros
router.get('/photos', auth, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;
    const where = {};

    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Photo.findAndCountAll({
      where,
      include: [{ model: User, attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      raw: true,
      nest: true
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      photos: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar foto
router.delete('/photos/:id', auth, isAdmin, async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Foto no encontrada' });
    }
    await photo.destroy();
    res.json({ message: 'Foto eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Moderar fotos
router.patch('/photos/:id/moderate', auth, isAdmin, async (req, res) => {
  try {
    const { status, reason } = req.body;
    const photo = await Photo.findByPk(req.params.id);
    
    if (!photo) {
      return res.status(404).json({ error: 'Foto no encontrada' });
    }

    photo.status = status;
    if (reason) photo.moderationReason = reason;
    await photo.save();
    res.json(photo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los destinos
router.get('/destinations', auth, isAdmin, async (req, res) => {
  try {
    const destinations = await Photo.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('id')), 'photoCount'],
        [sequelize.fn('MAX', sequelize.col('imageUrl')), 'imageUrl']
      ],
      where: {
        location: { [Op.not]: null },
        status: 'approved'
      },
      group: ['location'],
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('id')), '>', 0),
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      raw: true
    });

    const formattedDestinations = destinations.map((dest, index) => ({
      id: (index + 1).toString(),
      name: dest.location,
      location: dest.location,
      photoCount: parseInt(dest.photoCount),
      imageUrl: dest.imageUrl
    }));

    res.json({ destinations: formattedDestinations });
  } catch (error) {
    console.error('Error getting destinations:', error);
    res.status(500).json({ error: 'Error al obtener los destinos' });
  }
});

// Actualizar un destino
router.put('/destinations/:id', auth, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Buscar el destino original
    const destinations = await Photo.findAll({
      attributes: ['location'],
      group: ['location'],
      raw: true
    });

    const oldDestination = destinations[parseInt(id) - 1];
    if (!oldDestination) {
      return res.status(404).json({ error: 'Destino no encontrado' });
    }

    // Actualizar todas las fotos que tengan esa ubicación
    await Photo.update(
      { location: name },
      { where: { location: oldDestination.location } }
    );

    res.json({ message: 'Destino actualizado correctamente' });
  } catch (error) {
    console.error('Error updating destination:', error);
    res.status(500).json({ error: 'Error al actualizar el destino' });
  }
});

// Eliminar un destino
router.delete('/destinations/:id', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el destino
    const destinations = await Photo.findAll({
      attributes: ['location'],
      group: ['location'],
      raw: true
    });

    const destination = destinations[parseInt(id) - 1];
    if (!destination) {
      return res.status(404).json({ error: 'Destino no encontrado' });
    }

    // Eliminar la ubicación de todas las fotos que la tengan
    await Photo.update(
      { location: null },
      { where: { location: destination.location } }
    );

    res.json({ message: 'Destino eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ error: 'Error al eliminar el destino' });
  }
});

// Listar usuarios con paginación y búsqueda
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    const where = { role: 'user' };

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: ['id', 'email', 'name', 'isBlocked', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      raw: true
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      users: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gestionar usuarios
router.patch('/users/:id', auth, isAdmin, async (req, res) => {
  try {
    const { isBlocked, role } = req.body;
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.role === 'admin' && req.user.id !== user.id) {
      return res.status(403).json({ error: 'No se puede modificar a otro administrador' });
    }

    if (isBlocked !== undefined) user.isBlocked = isBlocked;
    if (role && req.user.id !== user.id) user.role = role;
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los destinos
router.get('/destinations', auth, isAdmin, async (req, res) => {
  try {
    const destinations = await Photo.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('id')), 'photoCount']
      ],
      where: { status: 'approved' },
      group: ['location'],
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('id')), '>', 0),
      raw: true
    });

    res.json({
      destinations: destinations.map(d => ({
        id: d.location, // Usamos la ubicación como ID
        name: d.location,
        photoCount: parseInt(d.photoCount)
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar un nuevo destino (esto es solo para mostrar en la interfaz, no afecta a las fotos)
router.post('/destinations', auth, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El nombre del destino es requerido' });
    }
    
    // Verificar si ya existe un destino con ese nombre
    const existingDestination = await Photo.findOne({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('id')), 'photoCount']
      ],
      where: { location: name, status: 'approved' },
      group: ['location'],
      raw: true
    });

    if (existingDestination) {
      return res.status(400).json({ error: 'Este destino ya existe' });
    }

    // Como no tenemos una tabla de destinos, simplemente devolvemos el destino creado
    // con un contador de fotos en 0
    res.status(201).json({
      destination: {
        id: name,
        name: name,
        photoCount: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un destino (esto marcará todas las fotos de ese destino como rechazadas)
router.delete('/destinations/:location', auth, isAdmin, async (req, res) => {
  try {
    const { location } = req.params;
    await Photo.update(
      { status: 'rejected', moderationReason: 'Destino eliminado por el administrador' },
      { where: { location, status: 'approved' } }
    );
    res.json({ message: 'Destino eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
