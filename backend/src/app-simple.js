const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'http://localhost:3002',
    'https://socialbot-frontend.onrender.com',
    'https://ocialbot-frontend.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  console.log('✅ Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'SocialBot Backend API - SIMPLIFIED MODE'
  });
});

app.get('/api/health', (req, res) => {
  console.log('✅ API Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'SocialBot Backend API - SIMPLIFIED MODE'
  });
});

// Temporary register (without database)
app.post('/auth/register', (req, res) => {
  console.log('📝 Registration request:', req.body);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required',
        success: false 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters',
        success: false 
      });
    }

    console.log('✅ Mock registration successful:', email);

    res.status(201).json({
      success: true,
      message: 'User created successfully (MOCK MODE)',
      user: {
        id: 'mock-id-' + Date.now(),
        email: email
      },
      token: 'mock-token-' + Date.now()
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      error: 'Server error: ' + error.message,
      success: false
    });
  }
});

// API version of register
app.post('/api/auth/register', (req, res) => {
  console.log('📝 API Registration request:', req.body);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required',
        success: false 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters',
        success: false 
      });
    }

    console.log('✅ Mock API registration successful:', email);

    res.status(201).json({
      success: true,
      message: 'User created successfully (MOCK API MODE)',
      user: {
        id: 'mock-api-id-' + Date.now(),
        email: email
      },
      token: 'mock-api-token-' + Date.now()
    });

  } catch (error) {
    console.error('❌ API Registration error:', error);
    res.status(500).json({ 
      error: 'Server error: ' + error.message,
      success: false
    });
  }
});

// Temporary login (without database)
app.post('/auth/login', (req, res) => {
  console.log('🔐 Login request:', req.body);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required',
        success: false 
      });
    }

    console.log('✅ Mock login successful:', email);

    res.json({
      success: true,
      message: 'Login successful (MOCK MODE)',
      user: {
        id: 'mock-id-' + Date.now(),
        email: email
      },
      token: 'mock-token-' + Date.now()
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      error: 'Server error: ' + error.message,
      success: false
    });
  }
});

// API version of login
app.post('/api/auth/login', (req, res) => {
  console.log('🔐 API Login request:', req.body);
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required',
        success: false 
      });
    }

    console.log('✅ Mock API login successful:', email);

    res.json({
      success: true,
      message: 'Login successful (MOCK API MODE)',
      user: {
        id: 'mock-api-id-' + Date.now(),
        email: email
      },
      token: 'mock-api-token-' + Date.now()
    });

  } catch (error) {
    console.error('❌ API Login error:', error);
    res.status(500).json({ 
      error: 'Server error: ' + error.message,
      success: false
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  console.log('❓ Unknown route:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found',
    success: false
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
  console.log(`🏥 API Health: http://localhost:${PORT}/api/health`);
  console.log(`📝 Register: POST http://localhost:${PORT}/auth/register`);
  console.log(`📝 API Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/auth/login`);
  console.log(`🔐 API Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`🎯 MOCK MODE: No database required - TESTING PURPOSES ONLY`);
  console.log(`🔧 Environment: NODE_ENV=${process.env.NODE_ENV || 'development'}`);
}); 