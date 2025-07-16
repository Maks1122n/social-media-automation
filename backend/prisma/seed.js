const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Создаем системные настройки
  const systemSettings = [
    { key: 'SITE_NAME', value: 'SocialBot', category: 'general' },
    { key: 'MAX_ACCOUNTS_PER_USER', value: '50', category: 'limits' },
    { key: 'MAX_POSTS_PER_DAY', value: '100', category: 'limits' },
    { key: 'ENABLE_REGISTRATION', value: 'true', category: 'features' },
    { key: 'ENABLE_AI_GENERATION', value: 'false', category: 'features' },
    { key: 'MAINTENANCE_MODE', value: 'false', category: 'system' }
  ];

  for (const setting of systemSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting
    });
  }

  // Создаем админа
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@socialbot.com' },
    update: {},
    create: {
      email: 'admin@socialbot.com',
      password: adminPassword,
      role: 'ADMIN',
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'User',
          company: 'SocialBot Inc.'
        }
      }
    }
  });

  // Создаем демо пользователей
  const demoUsers = [
    {
      email: 'demo@socialbot.com',
      password: await bcrypt.hash('demo123', 12),
      role: 'USER',
      profile: {
        firstName: 'Demo',
        lastName: 'User',
        company: 'Demo Company'
      }
    },
    {
      email: 'premium@socialbot.com', 
      password: await bcrypt.hash('premium123', 12),
      role: 'PREMIUM',
      profile: {
        firstName: 'Premium',
        lastName: 'User',
        company: 'Premium Corp'
      }
    }
  ];

  for (const userData of demoUsers) {
    const { profile, ...userInfo } = userData;
    await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {},
      create: {
        ...userInfo,
        profile: {
          create: profile
        }
      }
    });
  }

  // Создаем демо аккаунты для demo пользователя
  const demoUser = await prisma.user.findUnique({
    where: { email: 'demo@socialbot.com' }
  });

  if (demoUser) {
    const demoAccounts = [
      {
        username: 'demo_instagram_fashion',
        platform: 'INSTAGRAM',
        status: 'ACTIVE',
        postsPerDay: 4,
        followers: 15420,
        following: 1250,
        engagement: 3.2,
        userId: demoUser.id
      },
      {
        username: 'demo_youtube_tech',
        platform: 'YOUTUBE',
        status: 'ACTIVE', 
        postsPerDay: 1,
        followers: 8750,
        following: 345,
        engagement: 5.8,
        userId: demoUser.id
      },
      {
        username: 'demo_tiktok_dance',
        platform: 'TIKTOK',
        status: 'PAUSED',
        postsPerDay: 3,
        followers: 25100,
        following: 2100,
        engagement: 7.2,
        userId: demoUser.id
      }
    ];

    for (const account of demoAccounts) {
      await prisma.account.upsert({
        where: {
          userId_platform_username: {
            userId: account.userId,
            platform: account.platform,
            username: account.username
          }
        },
        update: {},
        create: account
      });
    }
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 