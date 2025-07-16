const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createTestUser() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔨 Creating test user...');
    
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    });
    
    console.log('✅ Test user created:', user);
    
    // Также создадим админа для тестирования
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN'
      }
    });
    
    console.log('✅ Admin user created:', admin);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('ℹ️ Users already exist');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 