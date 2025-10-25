# 8Pods Backend API

A modern NestJS backend API for podcast search and management, built with TypeScript and PostgreSQL.

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
docker-compose up backend
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL 16
- npm or yarn

## ⚙️ Environment Setup

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=podcast_db
CORS_ORIGIN=http://localhost:3001
ITUNES_API_URL=https://itunes.apple.com/search
```

## 📡 API Endpoints

### Search Podcasts
```
GET /api/v1/search?q=technology&page=1&limit=20
```

**Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### API Documentation
Interactive Swagger documentation available at:
```
http://localhost:3000/api/docs
```

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **ORM**: TypeORM
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Rate Limiting**: @nestjs/throttler

## 📁 Project Structure

```
src/
├── config/          # Database configuration
├── entities/        # TypeORM entities
├── modules/
│   └── search/      # Search module
│       ├── dto/     # Data Transfer Objects
│       ├── search.controller.ts
│       ├── search.service.ts
│       └── search.module.ts
└── main.ts          # Application entry point
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev      # Start with hot reload

# Production
npm run build          # Build for production
npm run start:prod     # Start production server

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run test:cov       # Generate coverage report

# Linting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 60 seconds
- **Input Validation**: DTOs with class-validator
- **CORS**: Configured for specific origins
- **SQL Injection Protection**: TypeORM parameterized queries

## 🗄️ Database Schema

### Podcast Entity
```typescript
{
  id: UUID (Primary Key)
  collectionId: number (Unique, Indexed)
  trackId: number
  trackName: string (Indexed)
  artistName: string (Indexed)
  genres: string[] (JSONB)
  artworkUrl100: string
  artworkUrl600: string
  releaseDate: Date
  trackCount: number
  country: string
  feedUrl: string
  trackViewUrl: string
  primaryGenreName: string
  createdAt: Date
  updatedAt: Date
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
NODE_ENV=production npm run start:prod
```

### Docker Deployment
```bash
docker build -t 8pods-backend .
docker run -p 3000:3000 8pods-backend
```

## 📝 License

**Developed with ❤️ for Thmanyah (ثمانية)**

**By: Mahmoud Metwally**

**Date: 25 Oct 2025**