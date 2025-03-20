import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface PhotoData {
  id: string;
  filename: string;
  originalName: string;
  title: string;
  country: string;
  continent?: string;
  region?: string;
  city?: string;
  blurFaces: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export const photosDB = {
  create: async (data: Omit<PhotoData, 'id' | 'createdAt' | 'updatedAt'>) => {
    return prisma.photo.create({
      data: {
        ...data,
        status: 'pending'
      }
    });
  },

  findPending: async () => {
    return prisma.photo.findMany({
      where: {
        status: 'pending'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  updateStatus: async (id: string, status: 'approved' | 'rejected') => {
    return prisma.photo.update({
      where: { id },
      data: { status }
    });
  }
};
