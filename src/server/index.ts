import express from 'express';
import cors from 'cors';
import photosRouter from './api/photos';
import authRouter from './api/auth';
import adminRouter from './api/admin';

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/photos', photosRouter);
app.use('/api/admin', adminRouter);

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
