# SocialBot - Development Guide

## 🚀 Quick Start

### Local Development Setup

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd social-media-automation
   ```

2. **Backend setup:**
   ```bash
   cd backend
   npm install
   
   # Use SQLite for local development
   copy prisma\schema.dev.prisma prisma\schema.prisma
   npx prisma generate
   npx prisma db push
   node create-test-user.js  # Creates test@example.com / 123456
   
   # Start backend (port 3001)
   node src/app.js
   ```

3. **Frontend setup:**
   ```bash
   cd frontend
   npm install
   npm run dev  # Starts on port 3000
   ```

## 🔐 Authentication Testing

### Test Users Created:
- **test@example.com** / **123456** (USER role)
- **admin@example.com** / **admin123** (ADMIN role)

### Test Commands:
```bash
# Test local authentication
node test-working-auth.js

# Test production authentication  
node test-auth.js
```

## 🌐 URLs

### Local Development:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

### Production:
- **Frontend**: https://ocialbot-frontend.onrender.com
- **Backend**: https://socialbot-backend.onrender.com
- **Health Check**: https://socialbot-backend.onrender.com/health

## 📋 API Endpoints

### Public:
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Protected (requires JWT token):
- `GET /api/profile` - User profile
- `GET /api/accounts` - User accounts

## 🔧 Configuration

### Local (SQLite):
- Schema: `backend/prisma/schema.dev.prisma`
- Database: `backend/prisma/dev.db`
- Port: 3001

### Production (PostgreSQL):
- Schema: `backend/prisma/schema.prod.prisma` 
- Database: Render PostgreSQL
- Port: Render assigned

## 🧪 Testing

### Registration Test:
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"new@example.com","password":"123456"}'
```

### Login Test:
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 📦 Deployment

### To GitHub:
```bash
git add .
git commit -m "Add working authentication system"
git push origin main
```

### Render Auto-Deploy:
- Frontend and Backend auto-deploy on push to main
- Uses `render.yaml` configuration
- PostgreSQL migrations run automatically

## 🛠️ Development Commands

```bash
# Backend
cd backend
npm start          # Start production server
node src/app.js    # Start development server
node test-server.js # Start minimal test server

# Frontend  
cd frontend
npm run dev        # Development server
npm run build      # Production build

# Database
npx prisma generate    # Generate client
npx prisma db push     # Apply schema changes
npx prisma studio      # Database GUI
```

## ✅ Working Features

- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ SQLite for local development
- ✅ PostgreSQL for production
- ✅ Real authentication (no mock mode)
- ✅ Security headers and rate limiting
- ✅ Error handling and logging 