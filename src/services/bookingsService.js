import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllBookings(filters = {}) {
  const { userId } = filters;

  return prisma.booking.findMany({
    where: {
      ...(userId && { userId })
    },
    include: {
      user: true,
      property: true
    }
  });
}

export async function getBookingById(id) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      user: true,
      property: true
    }
  });
}

export async function createBooking(data) {
  return prisma.booking.create({ data });
}

export async function updateBooking(id, data) {
  return prisma.booking.update({
    where: { id },
    data
  });
}

export async function deleteBooking(id) {
  return prisma.booking.delete({
    where: { id }
  });
}
