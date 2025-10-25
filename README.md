# 🎙️ 8Pods - Podcast Search Application

> A modern, bilingual podcast search application built with Next.js 14 and NestJS, featuring Arabic/English support with RTL layout and Thmanyah branding.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-E0234E?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

---

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd th8mni-task

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3001
# Backend API: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
```

### Local Development

**Prerequisites:** Node.js 20+, PostgreSQL 16, npm

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run start:dev

# Frontend (in new terminal)
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

---

## ✨ Features

### 🌍 Core Features
- **Bilingual Support**: Arabic (RTL) and English (LTR) with dynamic switching
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Podcast Search**: Real-time search powered by iTunes API
- **Infinite Scroll**: Automatic loading as you scroll
- **Responsive Design**: Mobile-first approach (1-4 column grid)

### 🎨 Design & UX
- **Thmanyah Branding**: Gold primary color (#d4af37)
- **Professional Typography**: IBM Plex Sans Arabic (8 weights)
- **Smooth Animations**: Framer Motion for card transitions
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages with retry
- **Back to Top**: Appears after scrolling 300px

### ⚡ Performance
- **Debounced Search**: 300ms delay to reduce API calls
- **React Query Caching**: 5-minute stale time
- **Database Indexing**: Optimized PostgreSQL queries
- **Image Optimization**: Next.js automatic WebP conversion
- **Rate Limiting**: 100 requests per 60 seconds

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (TanStack Query)
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL 16 with TypeORM
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Rate Limiting**: @nestjs/throttler

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database Volume**: Persistent PostgreSQL data

---

## 📁 Project Structure

```
th8mni-task/
├── frontend/                    # Next.js 14 Frontend
│   ├── src/
│   │   ├── app/[locale]/       # Internationalized routing
│   │   ├── components/         # React components
│   │   │   ├── layout/        # Header, ThemeToggle, LanguageSwitcher
│   │   │   ├── search/        # SearchBar
│   │   │   ├── podcast/       # PodcastCard, PodcastGrid, ViewToggle
│   │   │   ├── common/        # Reusable UI components
│   │   │   └── providers/     # ThemeProvider, QueryProvider
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # API client, fonts
│   │   ├── messages/          # i18n translations (ar.json, en.json)
│   │   └── types/             # TypeScript interfaces
│   └── public/                # Static assets
│
├── backend/                     # NestJS Backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── entities/          # TypeORM entities (Podcast)
│   │   ├── modules/
│   │   │   └── search/        # Search module (controller, service, DTOs)
│   │   └── main.ts            # Application bootstrap
│   └── test/                  # E2E tests
│
└── docker-compose.yml          # Multi-container orchestration
```

---

## 📡 API Endpoints

### Search Podcasts
```http
GET /api/v1/search?q=technology&page=1&limit=20
```

**Parameters:**
- `q` (required): Search query
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 200)

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
      "totalPages": 5,
      "hasNextPage": true
    }
  }
}
```

**Interactive Documentation:** http://localhost:3000/api/docs

---

## 🎨 Design System

### Colors (Thmanyah Theme)

**Light Mode:**
- Primary: `#d4af37` (Gold)
- Background: `#ffffff`
- Card: `#f9f9f9`

**Dark Mode:**
- Primary: `#d4af37` (Gold)
- Background: `#0a0a0a`
- Card: `#1a1a1a`

### Typography
- **Font**: IBM Plex Sans Arabic
- **Weights**: 100-800 (Thin to ExtraBold)
- **Support**: Arabic and English

---

## 🔧 Configuration

### Environment Variables

**Backend** (`.env`):
```env
NODE_ENV=development
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=8pods_db
CORS_ORIGIN=http://localhost:3001
ITUNES_API_BASE_URL=https://itunes.apple.com
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

---

## 🐳 Docker Setup

### Two Docker Compose Configurations

The project includes two Docker Compose files for different environments:

#### 1. **Production Mode** (`docker-compose.yml`)

**When to use:**
- ✅ For production deployment
- ✅ For testing final build
- ✅ When you need optimized and fast build

**Features:**
- Optimized production build
- No hot reload
- Smaller Docker images
- No source code volumes

```bash
# Start production environment
docker-compose up --build

# Or in background
docker-compose up -d
```

#### 2. **Development Mode** (`docker-compose.dev.yml`)

**When to use:**
- ✅ During active development
- ✅ When you need automatic hot reload
- ✅ To see code changes instantly

**Features:**
- Hot reload for Backend and Frontend
- Source code mounted as volumes
- Code changes reflect immediately without rebuild
- Perfect for rapid development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Or in background
docker-compose -f docker-compose.dev.yml up -d
```

### Main Differences

| Feature | Production (`docker-compose.yml`) | Development (`docker-compose.dev.yml`) |
|---------|----------------------------------|---------------------------------------|
| **Dockerfile** | `Dockerfile` | `Dockerfile.dev` |
| **Hot Reload** | ❌ No | ✅ Yes |
| **Source Volumes** | ❌ No | ✅ Yes (mounted) |
| **Build Size** | 🔥 Optimized & Small | 📦 Larger (includes dev deps) |
| **NODE_ENV** | `production` | `development` |
| **Container Names** | `8pods-*` | `8pods-*-dev` |
| **Database Volume** | `postgres_data` | `postgres_data_dev` |
| **Use Case** | Production/Testing | Active Development |

### Docker Commands

```bash
# ========== PRODUCTION ==========
# Start production environment
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Reset database (remove volumes)
docker-compose down -v

# Rebuild specific service
docker-compose up --build frontend


# ========== DEVELOPMENT ==========
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop services
docker-compose -f docker-compose.dev.yml down

# Reset database
docker-compose -f docker-compose.dev.yml down -v


# ========== USEFUL COMMANDS ==========
# Check running containers
docker ps

# Execute command in container
docker exec -it 8pods-backend-dev sh
docker exec -it 8pods-frontend-dev sh

# View all logs
docker-compose logs --tail=100

# Clean up everything
docker system prune -a
```

---

## 🧪 Testing

### Quick Test

Run all tests (frontend + backend):

```bash
./run-tests.sh
```

### Frontend Tests

```bash
cd frontend
npm install
npm test                  # Run all tests
npm test:watch           # Watch mode
npm test:coverage        # With coverage report
```

**Test Coverage:**
- ✅ SearchBar (debounce, search handling)
- ✅ PodcastCard (rendering, iTunes link)
- ✅ ThemeToggle (dark/light mode toggle)
- ✅ LanguageSwitcher (Arabic ↔ English)
- ✅ LoadingSkeleton (loading states)
- ✅ ErrorMessage (error handling, retry)
- ✅ useDebounce hook (debouncing logic)
- ✅ useViewMode hook (grid/list persistence)

### Backend Tests

```bash
cd backend
npm install
npm test                  # Unit tests
npm run test:e2e         # E2E tests
npm run test:cov         # Coverage report
```

**Test Coverage:**
- ✅ SearchService (pagination, error handling)
- ✅ SearchController (API endpoints)
- ✅ E2E Tests (full API flow, rate limiting)
- ✅ Swagger documentation endpoints

### Test Documentation

For comprehensive testing documentation, see [TESTING.md](./TESTING.md)

---

## 🧪 Available Scripts

### Backend
```bash
npm run start:dev      # Start with hot reload
npm run build          # Build for production
npm run start:prod     # Start production server
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run lint           # Run ESLint
```

### Frontend
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
```

---

## 🔒 Security Features

- ✅ **Rate Limiting**: 100 requests per 60 seconds
- ✅ **Input Validation**: DTOs with class-validator
- ✅ **CORS**: Configured for specific origins
- ✅ **SQL Injection Protection**: TypeORM parameterized queries
- ✅ **XSS Protection**: React's built-in sanitization
- ✅ **Environment Variables**: Sensitive data protected

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* 2 columns */
md: 768px   /* 2 columns */
lg: 1024px  /* 3 columns */
xl: 1280px  /* 4 columns */
```

---

## 🚀 Deployment

### Production Build

**Backend:**
```bash
cd backend
npm run build
NODE_ENV=production npm run start:prod
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

### Docker Production
```bash
docker build -t 8pods-backend ./backend
docker build -t 8pods-frontend ./frontend
```

### Environment Variables (Production)
Update `CORS_ORIGIN`, `DATABASE_*`, and `NEXT_PUBLIC_API_URL` for your production environment.

---

## 📖 Documentation
- **FRONTEND**: See `./frontend/README.md` for comprehensive guide
- **BACKEND**: See `./backend/README.md` for fastest setup

---

## ✅ Features Checklist

### Core Requirements
- ✅ Search podcasts via iTunes API
- ✅ Display results with artwork
- ✅ Infinite scroll pagination
- ✅ Play button (opens iTunes)
- ✅ Genre tags/badges
- ✅ Dark mode
- ✅ Bilingual (Arabic/English)
- ✅ RTL support for Arabic
- ✅ Responsive design

### Advanced Features
- ✅ Debounced search
- ✅ Loading skeletons
- ✅ Error handling with retry
- ✅ API rate limiting
- ✅ Database caching
- ✅ TypeScript strict mode
- ✅ Swagger documentation
- ✅ Docker containerization
- ✅ Theme persistence
- ✅ SEO optimization

---

## 🎯 Test Checklist

All features below are covered by automated tests:

- [x] **Search with different keywords** - ✅ SearchBar.test.tsx, search.e2e-spec.ts
- [x] **Navigate with infinite scroll** - ✅ usePodcastSearch hook, SearchService pagination
- [x] **Click play button (opens iTunes)** - ✅ PodcastCard.test.tsx
- [x] **Switch languages (Arabic ↔ English)** - ✅ LanguageSwitcher.test.tsx
- [x] **Toggle dark/light mode** - ✅ ThemeToggle.test.tsx
- [x] **Test responsive design** - ✅ Component rendering tests
- [x] **Test empty search state** - ✅ EmptySearchState.test.tsx
- [x] **Test error handling** - ✅ ErrorMessage.test.tsx, SearchService error tests
- [x] **Test loading states** - ✅ LoadingSkeleton.test.tsx
- [x] **Check API documentation** - ✅ E2E Swagger tests at `/api/docs`

**Run all tests:** `./run-tests.sh` or `npm test`

**See detailed testing documentation:** [TESTING.md](./TESTING.md)

---

## 📝 License

**Developed with ❤️ for Thmanyah (ثمانية)**

**By**: Mahmoud Metwally
**Date**: October 25, 2025

---

## 🔗 Links

- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **API Docs**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Thmanyah**: [https://thmanyah.com](https://thmanyah.com)

---

**Ready to explore?** Run `docker-compose up --build` and visit [http://localhost:3001](http://localhost:3001) 🎉
