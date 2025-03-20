const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081', 
    'http://localhost:8082', 
    'http://localhost:8083',
    'http://localhost:55069',
    'http://127.0.0.1:55069',
    'http://127.0.0.1:62683',
    'http://localhost:62683',
    'http://192.168.20.158:8080',
    'http://192.168.20.158:8081',
    'http://192.168.20.158:8082',
    'http://192.168.20.158:8083'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Inicializar base de datos y servidor
const PORT = process.env.PORT || 3005;

async function initializeApp() {
  try {
    await sequelize.sync();
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar:', error);
  }
}

initializeApp();
