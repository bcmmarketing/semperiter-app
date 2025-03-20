const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Usar directamente la clave secreta
    const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      console.error('Error al verificar JWT:', jwtError.message);
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ error: 'Usuario bloqueado' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.error('Error en autenticación:', e.message);
    res.status(401).json({ error: 'Por favor autentícate' });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  next();
};

module.exports = { auth, isAdmin };
