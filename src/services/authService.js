import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function login(username, password) {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user || user.password !== password) {
    return null;
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token };
}
