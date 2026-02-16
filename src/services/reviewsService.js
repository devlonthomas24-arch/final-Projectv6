import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllReviews() {
  return prisma.review.findMany({
    include: {
      user: true,
      property: true
    }
  });
}

export async function getReviewById(id) {
  return prisma.review.findUnique({
    where: { id },
    include: {
      user: true,
      property: true
    }
  });
}

export async function createReview(data) {
  return prisma.review.create({ data });
}

export async function updateReview(id, data) {
  return prisma.review.update({
    where: { id },
    data
  });
}

export async function deleteReview(id) {
  return prisma.review.delete({
    where: { id }
  });
}
