# API Response Schemas

## Authentication Endpoints

### POST /auth/register
**Success (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "clx123abc",
    "email": "user@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400) - Validation:**
```json
{
  "success": false,
  "error": "\"email\" must be a valid email"
}
```

**Error (400) - User Exists:**
```json
{
  "success": false,
  "error": "User with this email already exists"
}
```

**Error (500) - Server Error:**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

### POST /auth/login
**Success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "clx123abc",
    "email": "user@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401) - Invalid Credentials:**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

**Error (429) - Rate Limited:**
```json
{
  "error": "Too many authentication attempts, please try again later.",
  "retryAfter": 900
}
```

### GET /health
**Success (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "SocialBot Backend API",
  "version": "1.0.0",
  "database": "connected",
  "uptime": 12345
}
```

**Error (503) - Service Unavailable:**
```json
{
  "status": "error",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "SocialBot Backend API",
  "database": "disconnected",
  "error": "Database connection failed"
}
``` 