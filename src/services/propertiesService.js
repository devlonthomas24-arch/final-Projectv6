import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllProperties(filters = {}) {
  const { location, pricePerNight } = filters;

  return prisma.property.findMany({
    where: {
      ...(location && { location }),
      ...(pricePerNight && { pricePerNight: Number(pricePerNight) })
    },
    include: {
      reviews: true,
      bookings: true,
      host: true
    }
  });
}

export async function getPropertyById(id) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      reviews: true,
      bookings: true,
      host: true
    }
  });
}

export async function createProperty(data) {
  return prisma.property.create({ data });
}

export async function updateProperty(id, data) {
  return prisma.property.update({
    where: { id },
    data
  });
}

export async function deleteProperty(id) {
  return prisma.property.delete({
    where: { id }
  });
}
