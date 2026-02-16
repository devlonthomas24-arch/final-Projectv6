import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllHosts() {
  return prisma.host.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
      listings: true
    }
  });
}

export async function getHostById(id) {
  return prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
      listings: true
    }
  });
}

export async function createHost(data) {
  return prisma.host.create({ data });
}

export async function updateHost(id, data) {
  return prisma.host.update({
    where: { id },
    data
  });
}

export async function deleteHost(id) {
  const properties = await prisma.property.findMany({
    where: { hostId: id },
    select: { id: true }
  });

  const propertyIds = properties.map((p) => p.id);

  await prisma.review.deleteMany({
    where: { propertyId: { in: propertyIds } }
  });

  await prisma.booking.deleteMany({
    where: { propertyId: { in: propertyIds } }
  });

  await prisma.property.deleteMany({
    where: { hostId: id }
  });

  return prisma.host.delete({
    where: { id }
  });
}

export async function findHostsByName(name) {
  return prisma.host.findMany({
    where: {
      name: {
        contains: name
      }
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
      aboutMe: true,
      listings: true
    }
  });
}
