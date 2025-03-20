import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Crear usuarios de ejemplo
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: adminPassword,
        name: 'Administrador',
        role: 'admin'
      }
    });

    const user = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: userPassword,
        name: 'Usuario Normal',
        role: 'user'
      }
    });

    console.log('Usuarios creados:');
    console.log('Admin:', { email: admin.email, password: 'admin123' });
    console.log('Usuario:', { email: user.email, password: 'user123' });

    // Crear directorio de uploads si no existe
    const uploadsDir = path.join(process.cwd(), '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Copiar imágenes de ejemplo
    const sampleImages = [
      {
        title: 'Sagrada Familia',
        country: 'España',
        region: 'Cataluña',
        city: 'Barcelona',
        userId: user.id
      },
      {
        title: 'Torre Eiffel',
        country: 'Francia',
        city: 'París',
        userId: user.id
      },
      {
        title: 'Coliseo Romano',
        country: 'Italia',
        region: 'Lacio',
        city: 'Roma',
        userId: admin.id
      }
    ];

    // Crear entradas en la base de datos para las fotos
    for (const [index, image] of sampleImages.entries()) {
      const filename = `sample${index + 1}.jpg`;
      const filePath = path.join(uploadsDir, filename);

      // Crear un archivo de imagen de ejemplo
      fs.writeFileSync(filePath, 'Sample image content');

      await prisma.photo.create({
        data: {
          ...image,
          filename,
          originalName: filename,
          status: 'pending'
        }
      });
    }

    console.log('Datos de ejemplo creados correctamente');
  } catch (error) {
    console.error('Error al crear datos de ejemplo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
