require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://ocialbot-frontend.onrender.com'],
  credentials: true
}));

// Rate limiting
const generalLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с IP
  message: { error: 'Too many requests' }
});

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // максимум 10 попыток входа с IP
  message: { error: 'Too many auth attempts' }
});

app.use(generalLimit);
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'SocialBot Backend API',
      version: '1.0.0',
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    });
  }
});

// API Health check (for compatibility)
app.get('/api/health', async (req, res) => {
  res.redirect('/health');
});

// Registration
app.post('/auth/register', authLimit, async (req, res) => {
  try {
    console.log('📝 Registration request:', { email: req.body.email });
    
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      });
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'USER'
      }
    });
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    console.log('✅ User registered successfully:', user.email);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
});

// API Registration (for compatibility)
app.post('/api/auth/register', authLimit, (req, res) => {
  res.redirect(307, '/auth/register');
});

// Login
app.post('/auth/login', authLimit, async (req, res) => {
  try {
    console.log('🔐 Login request:', { email: req.body.email });
    
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );
    
    console.log('✅ User logged in successfully:', user.email);
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// API Login (for compatibility)
app.post('/api/auth/login', authLimit, (req, res) => {
  res.redirect(307, '/auth/login');
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Protected routes
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, role: true, createdAt: true, lastLogin: true }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

app.get('/api/accounts', authenticateToken, (req, res) => {
  // Mock данные для совместимости
  res.json({
    success: true,
    accounts: [
      { id: 1, platform: 'instagram', username: '@demo_account', status: 'active' }
    ]
  });
});

// Error handling
app.use((req, res) => {
  console.log(`❓ Unknown route: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SocialBot Backend running on port ${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`📝 Register: POST http://localhost:${PORT}/auth/register`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/auth/login`);
  console.log(`👤 Profile: GET http://localhost:${PORT}/api/profile`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
}); 