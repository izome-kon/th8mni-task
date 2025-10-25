# 8Pods Frontend

A modern, bilingual podcast search application built with Next.js 14, featuring Arabic/English support with RTL layout and Thmanyah branding.

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
docker-compose up frontend
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3001`

## 📋 Prerequisites

- Node.js 20+
- npm or yarn

## ⚙️ Environment Setup

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## ✨ Features

### 🌍 Internationalization
- **Bilingual Support**: Arabic (RTL) and English (LTR)
- **Dynamic Language Switching**: Change language on the fly
- **Locale-based Routing**: `/ar` for Arabic, `/en` for English
- **next-intl Integration**: Type-safe translations

### 🎨 Design & UX
- **Thmanyah Branding**: Gold primary color (#d4af37)
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach (1-4 column grid)
- **IBM Plex Sans Arabic**: Professional Arabic font (8 weights)
- **Smooth Animations**: Framer Motion for card animations
- **Back to Top Button**: Appears after scrolling 300px

### 🔍 Search Experience
- **Debounced Search**: 300ms delay to reduce API calls
- **Real-time Results**: Instant search as you type
- **Infinite Scroll**: Automatically loads more results as you scroll
- **Loading Skeletons**: Professional loading states
- **Error Handling**: User-friendly error messages with retry
- **Empty States**: Helpful messages when no results

### 📱 Components
- **Search Bar**: Debounced input with loading indicator
- **Podcast Cards**: Artwork, hover effects, play button overlay
- **Genre Badges**: Visual tags for podcast categories
- **Infinite Scroll**: Automatic loading as you scroll down
- **Responsive Grid**: Auto-adjusts columns based on screen size

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (TanStack Query)
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 🏗️ Architecture & Patterns

### Custom Hooks
- **`usePodcastSearch`**: Manages search state, infinite scroll, and React Query integration
- **`useViewMode`**: Handles view mode persistence with localStorage

### Component Structure
- **Atomic Design**: Reusable components in `components/common/`
- **Separation of Concerns**: Business logic in hooks, UI in components
- **Type Safety**: TypeScript interfaces for all props and data structures

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/              # Internationalized routes
│       ├── layout.tsx         # Root layout with providers
│       ├── page.tsx           # Main search page (refactored to 60 lines)
│       └── globals.css        # Global styles & theme variables
├── components/
│   ├── layout/                # Layout components
│   │   ├── Header.tsx         # Main header with logo
│   │   ├── LanguageSwitcher.tsx  # Language toggle (uses useLanguageSwitcher)
│   │   └── ThemeToggle.tsx    # Dark/Light mode toggle
│   ├── search/                # Search components
│   │   └── SearchBar.tsx      # Debounced search input (uses useDebounce)
│   ├── podcast/               # Podcast display components
│   │   ├── index.ts           # Barrel exports
│   │   ├── PodcastCard.tsx    # Single podcast card
│   │   ├── PodcastGrid.tsx    # Responsive grid layout
│   │   ├── PodcastListItem.tsx  # List view item
│   │   └── ViewToggle.tsx     # Grid/List toggle
│   ├── common/                # Reusable UI components
│   │   ├── EmptySearchState.tsx      # Empty state with icon
│   │   ├── NoResultsState.tsx        # No results state
│   │   ├── LoadingMoreIndicator.tsx  # Infinite scroll loader
│   │   ├── LoadingSkeleton.tsx       # Loading shimmer cards
│   │   ├── ErrorMessage.tsx          # Error display with retry
│   │   ├── BackToTop.tsx             # Scroll to top button
│   │   └── Pagination.tsx            # Pagination component (legacy)
│   └── providers/             # Context providers
│       ├── ThemeProvider.tsx  # Theme context (light/dark/system)
│       └── QueryProvider.tsx  # React Query setup
├── hooks/                     # Custom React hooks (NEW)
│   ├── usePodcastSearch.ts    # Search logic & infinite scroll
│   ├── useViewMode.ts         # View mode persistence (grid/list)
│   ├── useLanguageSwitcher.ts # Language switching with URL sync
│   ├── useTheme.ts            # Theme context consumer
│   ├── useDebounce.ts         # Generic debouncing utility
│   └── index.ts               # Barrel exports
├── lib/
│   ├── api.ts                 # Axios API client configuration
│   └── fonts.ts               # IBM Plex Sans Arabic font loading
├── types/
│   └── podcast.ts             # TypeScript interfaces & types
├── messages/                  # i18n translations
│   ├── ar.json                # Arabic translations
│   └── en.json                # English translations
└── i18n/
    └── request.ts             # next-intl configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbopack (faster)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run tests
```

## 🎨 Theme Customization

### Thmanyah Brand Colors

**Light Mode:**
```css
--primary: 43 74% 53%;           /* #d4af37 Gold */
--background: 0 0% 100%;         /* White */
--foreground: 0 0% 3.9%;         /* Near Black */
--card: 0 0% 97.6%;              /* Light Gray */
```

**Dark Mode:**
```css
--primary: 43 74% 53%;           /* #d4af37 Gold */
--background: 0 0% 3.9%;         /* Near Black */
--foreground: 0 0% 98%;          /* Near White */
--card: 0 0% 10.2%;              /* Dark Gray */
```

### Font Weights (IBM Plex Sans Arabic)
- Thin: 100
- ExtraLight: 200
- Light: 300
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700
- ExtraBold: 800

## 🌐 Internationalization (i18n)

### Adding New Translations

1. **Add to English** (`src/messages/en.json`):
```json
{
  "search": {
    "placeholder": "Search for podcasts..."
  }
}
```

2. **Add to Arabic** (`src/messages/ar.json`):
```json
{
  "search": {
    "placeholder": "ابحث عن البودكاست..."
  }
}
```

3. **Use in Components**:
```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('search');
<input placeholder={t('placeholder')} />
```

## 🎯 Performance Optimizations

- ✅ **React Query Caching**: 5-minute stale time
- ✅ **Debounced Search**: Reduces API calls
- ✅ **Next.js Image Optimization**: Automatic WebP conversion
- ✅ **Code Splitting**: Automatic with App Router
- ✅ **Lazy Loading**: Components load on demand
- ✅ **Font Optimization**: Local fonts with font-display: swap

## 📱 Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

**Grid Columns:**
- Mobile (default): 1 column
- Small (sm): 2 columns
- Medium (md): 2 columns
- Large (lg): 3 columns
- Extra Large (xl): 4 columns

## 🔒 Security Features

- ✅ **XSS Protection**: React's built-in sanitization
- ✅ **HTTPS Ready**: Secure in production
- ✅ **Environment Variables**: Sensitive data protected
- ✅ **CORS**: Configured API client

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api/v1
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to AWS

#### Option 1: AWS Amplify (Recommended for Next.js)
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

**Or use AWS Console:**
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Amplify auto-detects Next.js settings
5. Add environment variable: `NEXT_PUBLIC_API_URL`
6. Deploy!

#### Option 2: AWS ECS (Docker)
```bash
# Build Docker image
docker build -t 8pods-frontend .

# Tag for ECR
docker tag 8pods-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/8pods-frontend:latest

# Login to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com

# Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/8pods-frontend:latest

# Deploy to ECS using Fargate or EC2
```

#### Option 3: AWS S3 + CloudFront (Static Export)
```bash
# Add to next.config.ts
output: 'export'

# Build static files
npm run build

# Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <dist-id> --paths "/*"
```

**S3 Bucket Configuration:**
- Enable static website hosting
- Set index.html as index document
- Configure bucket policy for public read

**CloudFront Configuration:**
- Origin: S3 bucket
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Compress Objects Automatically: Yes
- Custom Error Response: 404 → /404.html

#### Option 4: AWS EC2
```bash
# SSH to EC2 instance
ssh -i your-key.pem ubuntu@<ec2-ip>

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and build
git clone <your-repo>
cd frontend
npm install
npm run build

# Use PM2 for process management
sudo npm install -g pm2
pm2 start npm --name "8pods-frontend" -- start
pm2 startup
pm2 save

# Configure nginx as reverse proxy (optional)
sudo apt-get install nginx
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🧩 Component & Hook Examples

### Custom Hooks

#### `usePodcastSearch` - Search & Infinite Scroll
```tsx
import { usePodcastSearch } from '@/hooks/usePodcastSearch';

function SearchPage() {
  const {
    searchQuery,
    handleSearch,
    allPodcasts,
    totalResults,
    isLoading,
    hasSearchQuery,
    hasResults,
    observerTarget,
    isFetchingNextPage,
  } = usePodcastSearch();

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <PodcastGrid podcasts={allPodcasts} />
      <div ref={observerTarget} /> {/* Infinite scroll trigger */}
    </div>
  );
}
```

**Configuration Options:**
```tsx
usePodcastSearch({
  resultsPerPage: 50,        // Default: 20
  staleTime: 10 * 60 * 1000, // Default: 5 minutes
  retryCount: 3,             // Default: 2
  intersectionThreshold: 0.5 // Default: 0.1
});
```

#### `useViewMode` - View Persistence
```tsx
import { useViewMode } from '@/hooks/useViewMode';

function MyComponent() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <ViewToggle
      currentView={viewMode}
      onViewChange={setViewMode}
    />
  );
}
```

**Configuration Options:**
```tsx
useViewMode({
  storageKey: 'myCustomKey',  // Default: 'podcastViewMode'
  defaultMode: 'list'         // Default: 'grid'
});
```

### Common Components

#### Empty State Components
```tsx
import { EmptySearchState } from '@/components/common/EmptySearchState';
import { NoResultsState } from '@/components/common/NoResultsState';

// When no search query entered
<EmptySearchState
  title="Start searching"
  description="Enter keywords to find podcasts"
/>

// When search returns no results
<NoResultsState
  title="No results found"
  description="Try different search terms"
/>
```

#### Loading Indicator
```tsx
import { LoadingMoreIndicator } from '@/components/common/LoadingMoreIndicator';

{isFetchingNextPage && (
  <LoadingMoreIndicator text="Loading more podcasts..." />
)}
```

#### Other Components
```tsx
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { BackToTop } from '@/components/common/BackToTop';

// Loading skeleton (8 shimmer cards)
{isLoading && <LoadingSkeleton />}

// Error message with retry
{isError && (
  <ErrorMessage
    message="Failed to load podcasts"
    onRetry={() => refetch()}
  />
)}

// Back to top button (appears after 300px scroll)
<BackToTop />
```

### Podcast Components
```tsx
import { PodcastGrid } from '@/components/podcast/PodcastGrid';
import { PodcastCard } from '@/components/podcast/PodcastCard';
import { ViewToggle } from '@/components/podcast/ViewToggle';

// Responsive grid with view modes
<PodcastGrid podcasts={podcasts} viewMode="grid" />

// Single podcast card
<PodcastCard podcast={podcastData} />

// View mode toggle
<ViewToggle currentView={viewMode} onViewChange={setViewMode} />
```

### Search Component
```tsx
import { SearchBar } from '@/components/search/SearchBar';

<SearchBar
  onSearch={(query) => handleSearch(query)}
  initialValue={searchQuery}
/>
```

## 🧪 Testing

### Testing Custom Hooks
```bash
npm run test
```

Example test for `usePodcastSearch`:
```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { usePodcastSearch } from '@/hooks/usePodcastSearch';

describe('usePodcastSearch', () => {
  it('should handle search query', async () => {
    const { result } = renderHook(() => usePodcastSearch());

    act(() => {
      result.current.handleSearch('technology');
    });

    await waitFor(() => {
      expect(result.current.searchQuery).toBe('technology');
    });
  });
});
```

## 🐛 Troubleshooting

### Issue: API Connection Failed
**Solution**: Check that backend is running on `http://localhost:3000`

### Issue: Fonts Not Loading
**Solution**: Ensure fonts are in `/public/fonts/IBM-Plex-Sans-Arabic/`

### Issue: Dark Mode Not Persisting
**Solution**: Check browser localStorage is enabled

### Issue: Translations Not Working
**Solution**: Verify locale is in URL path (`/ar` or `/en`)

### Issue: Infinite Scroll Not Working
**Solution**:
1. Check `observerTarget` ref is attached to a DOM element
2. Verify `hasNextPage` is true
3. Check browser console for errors

### Issue: Custom Hook Not Working
**Solution**:
1. Ensure hooks are called at the top level of component
2. Check React Query provider is wrapping your app
3. Verify all dependencies are installed

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Framer Motion](https://www.framer.com/motion/)

## 📝 Code Quality & Best Practices

### Architecture Highlights
✅ **Custom Hooks** - Business logic separated from UI
✅ **Component Isolation** - Each component in its own file
✅ **Type Safety** - TypeScript strict mode throughout
✅ **Performance** - Memoization with `useMemo` and `useCallback`
✅ **Error Handling** - Try-catch blocks for localStorage operations
✅ **Accessibility** - ARIA labels and keyboard navigation
✅ **SEO Optimized** - Metadata and proper HTML structure

### Key Improvements (Senior-Level)
- **Bulk Operations** in backend for better performance
- **Custom Hooks** for reusable business logic
- **Memoized Values** to prevent unnecessary re-renders
- **Intersection Observer** for efficient infinite scroll
- **Error Boundaries** for graceful error handling
- **Component Extraction** for maintainability
- **Configuration Constants** instead of magic numbers

---

**Developed with ❤️ for Thmanyah (ثمانية)**

**By: Mahmoud Metwally**

**Date: 25 Oct 2025**
