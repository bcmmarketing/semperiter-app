const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Registro normal
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login normal
router.post('/login', async (req, res) => {
  try {
    console.log('Intento de login:', req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

    const user = await User.findOne({ where: { email } });
    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const validPassword = await user.validatePassword(password);
    console.log('Contraseña válida:', validPassword ? 'Sí' : 'No');

    if (!validPassword) {
      throw new Error('Credenciales inválidas');
    }

    if (user.isBlocked) {
      throw new Error('Usuario bloqueado');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Google Auth
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { email, name, sub: googleId } = ticket.getPayload();
    
    let user = await User.findOne({ where: { email } });
    
    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
        role: 'user'
      });
    }

    if (user.isBlocked) {
      throw new Error('Usuario bloqueado');
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ user, token: jwtToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear admin por defecto
router.post('/create-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ 
      where: { email: 'admin25@semperiter.com' } 
    });

    if (!adminExists) {
      await User.create({
        email: 'admin25@semperiter.com',
        password: 'login25',
        name: 'Administrator',
        role: 'admin'
      });
      res.json({ message: 'Admin creado exitosamente' });
    } else {
      res.json({ message: 'El admin ya existe' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
