const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function createTestUser() {
  const prisma = new PrismaClient();
  
  try {
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User'
      }
    });
    
    console.log('✅ User created successfully:', user);
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 