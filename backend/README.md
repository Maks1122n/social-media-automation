# SocialBot Backend API

Enterprise-grade backend for social media automation platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose

### Local Development Setup

1. **Clone and install:**
   ```bash
   git clone <repo>
   cd backend
   npm install
   ```

2. **Start infrastructure:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Setup database:**
   ```bash
   cp .env.example .env
   npm run migrate:dev
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.js               # Seed data
├── src/
│   ├── app.js                # Main application
│   ├── middleware/           # Custom middleware
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   └── utils/                # Helper functions
├── tests/                    # Test suites
├── docs/                     # Documentation
└── docker-compose.dev.yml    # Development environment
```

## 🔐 Authentication

Uses JWT tokens with 7-day expiration. Include in requests:
```
Authorization: Bearer <token>
```

## 📊 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Protected Endpoints
- `GET /api/profile` - User profile
- `GET /api/accounts` - User's accounts
- `POST /api/accounts` - Create account
- `GET /api/videos` - User's videos
- `POST /api/videos` - Upload video

## 🗄️ Database

### Models
- **User** - User accounts with roles
- **Account** - Social media accounts
- **Video** - Uploaded content
- **Post** - Scheduled/published posts
- **Analytics** - Performance metrics

### Roles
- `USER` - Regular user (50 accounts max)
- `PREMIUM` - Premium user (unlimited)
- `ADMIN` - Administrator
- `ENTERPRISE` - Enterprise customer

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
AWS_S3_BUCKET=your-bucket
```

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🚀 Deployment

### Render.com (Recommended)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy with `render.yaml`

### Manual Deployment
```bash
npm run migrate       # Run migrations
npm start            # Start production server
```

## 📈 Monitoring

- **Health Check:** `/health`
- **Logs:** Structured JSON via Pino
- **Metrics:** Custom middleware tracking
- **Errors:** Detailed error responses

## 🔒 Security

- Helmet security headers
- Rate limiting (100 req/15min)
- Input validation (Joi)
- SQL injection prevention (Prisma)
- XSS protection
- CORS configuration

## 📚 Documentation

- [API Responses](docs/api-responses.md)
- [Deployment Checklist](docs/deployment-checklist.md)
- [Rollback Plan](docs/rollback-plan.md)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Add tests
4. Run `npm test`
5. Create pull request

## 📞 Support

- Issues: GitHub Issues
- Email: support@socialbot.com
- Discord: [Community Server] 