import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8')).users;
  const hosts = JSON.parse(fs.readFileSync('./src/data/hosts.json', 'utf-8')).hosts;
  const properties = JSON.parse(fs.readFileSync('./src/data/properties.json', 'utf-8')).properties;
  const bookings = JSON.parse(fs.readFileSync('./src/data/bookings.json', 'utf-8')).bookings;
  const reviews = JSON.parse(fs.readFileSync('./src/data/reviews.json', 'utf-8')).reviews;

  await prisma.user.createMany({ data: users });
  await prisma.host.createMany({ data: hosts });
  await prisma.property.createMany({ data: properties });
  await prisma.booking.createMany({ data: bookings });
  await prisma.review.createMany({ data: reviews });
}

main()
  .then(() => {
    console.log('Database seeded successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
