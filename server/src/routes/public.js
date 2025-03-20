const express = require('express');
const sequelize = require('../config/database');
const router = express.Router();
const Photo = require('../models/photo');

// Obtener todos los destinos públicos
router.get('/destinations', async (req, res) => {
  try {
    const destinations = await Photo.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('id')), 'photoCount'],
        [sequelize.fn('MAX', sequelize.col('imageUrl')), 'imageUrl']
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
        photoCount: parseInt(d.photoCount),
        imageUrl: d.imageUrl
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener fotos por destino
router.get('/destinations/:location/photos', async (req, res) => {
  try {
    const { location } = req.params;
    const { page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Photo.findAndCountAll({
      where: { 
        location,
        status: 'approved'
      },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
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

module.exports = router;
