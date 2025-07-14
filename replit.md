# Personal Notes & Bookmark Manager

## Overview

This is a full-stack web application for managing personal notes and bookmarks with search, filtering, and URL metadata fetching capabilities. The application is built with a modern tech stack using React/TypeScript for the frontend and Node.js/Express for the backend, with a planned migration to PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Styling**: Tailwind CSS for utility-first styling with Shadcn/UI components for consistent design
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the stack
- **Data Storage**: Currently using in-memory storage with plans to migrate to PostgreSQL
- **Database ORM**: Drizzle ORM configured for PostgreSQL migration
- **API Design**: RESTful API with proper HTTP methods and status codes
- **Validation**: Zod for runtime schema validation on API endpoints

### Database Design
The application uses a simple relational schema with two main entities:
- **Notes**: Contains title, content, tags (array), favorite status, and timestamps
- **Bookmarks**: Contains title, URL, description, tags (array), favorite status, and timestamps

Both entities follow similar patterns with auto-incrementing IDs and creation/update timestamps.

## Key Components

### Data Models
- **Notes**: Personal text-based notes with tagging and favorites
- **Bookmarks**: URL bookmarks with automatic metadata fetching
- **Tags**: Array-based tagging system for organization
- **Favorites**: Boolean flag for marking important items

### API Endpoints
- **Notes API**: Full CRUD operations (`/api/notes`)
- **Bookmarks API**: Full CRUD operations (`/api/bookmarks`)
- **Search & Filter**: Query parameters for search, tag filtering, and favorites
- **URL Metadata**: Automatic fetching of page titles and descriptions

### Frontend Components
- **Navigation**: Responsive navigation with mobile-first design
- **Card Components**: Reusable cards for notes and bookmarks
- **Form Components**: Validated forms for creating/editing content
- **Search & Filters**: Real-time search and tag-based filtering
- **Mobile Responsive**: Optimized for both desktop and mobile experiences

## Data Flow

1. **User Input**: Forms capture user data with client-side validation
2. **API Communication**: TanStack Query manages API calls and caching
3. **Server Processing**: Express routes handle requests with Zod validation
4. **Data Storage**: Currently in-memory, designed for PostgreSQL migration
5. **Real-time Updates**: Query invalidation ensures UI consistency
6. **Metadata Enrichment**: Automatic URL metadata fetching for bookmarks

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives via Shadcn/UI
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting
- **Form Management**: React Hook Form with Zod resolver

### Backend Dependencies
- **Database**: Neon PostgreSQL (configured but not yet implemented)
- **ORM**: Drizzle ORM for database operations
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **HTTP Fetching**: Native fetch API for URL metadata

### Development Dependencies
- **Build Tools**: Vite for frontend, esbuild for backend
- **Development**: tsx for TypeScript execution
- **Replit Integration**: Specialized plugins for Replit environment

## Deployment Strategy

### Development Setup
- **Frontend**: Vite development server with HMR
- **Backend**: tsx with file watching for automatic restarts
- **Database**: Currently in-memory, PostgreSQL connection ready

### Production Build
- **Frontend**: Vite build outputs to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations ready for PostgreSQL deployment

### Environment Configuration
- **Database URL**: Configured via `DATABASE_URL` environment variable
- **Development**: Special handling for Replit environment
- **Production**: Node.js production server with static file serving

The application is designed to be easily deployed on platforms like Replit, Vercel, or any Node.js hosting service with minimal configuration changes.