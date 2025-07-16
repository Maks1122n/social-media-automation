const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:password@localhost:5432/socialbot_test?schema=public'
    }
  }
});

beforeAll(async () => {
  // Очищаем тестовую базу
  await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

// Очищаем после каждого теста
afterEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE`;
});

global.prisma = prisma; 