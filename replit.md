# LeadGenius AI - Lead Generation Platform

## Overview

LeadGenius AI is a comprehensive lead generation platform that combines AI-powered lead magnet creation with multi-channel lead management. The application features a React frontend with a full-stack Express.js backend, utilizing PostgreSQL for data persistence and modern UI components for a professional user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/UI components with Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme and responsive design
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: React Router for client-side navigation
- **Component Library**: Comprehensive UI component system with consistent theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the stack
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **API Design**: RESTful API with JSON responses and proper error handling
- **Session Management**: Connect-pg-simple for PostgreSQL-based session storage

### Database Schema
- **Users**: Authentication and user management
- **Leads**: Lead information with scoring, status tracking, and tagging
- **Lead Magnets**: AI-generated lead magnets with performance metrics
- **Drizzle ORM**: Type-safe database operations with automatic migrations

## Key Components

### Lead Management System
- Lead scoring and status tracking (hot/warm/cold)
- Multi-channel lead source tracking
- Tag-based lead categorization
- Activity timeline and engagement tracking

### Lead Magnet Builder
- AI-powered lead magnet generation
- Multiple content types (eBooks, quizzes, checklists)
- Industry-specific templates
- Conversion rate tracking and analytics

### Dashboard Analytics
- Real-time metrics and KPI tracking
- Lead conversion funnel visualization
- Performance analytics for lead magnets
- Activity feeds and recent lead tracking

### User Interface
- Professional lead generation theme with blue/purple color scheme
- Responsive design for mobile and desktop
- Dark mode support with CSS variables
- Accessible components following WCAG guidelines

## Data Flow

### Frontend to Backend Communication
1. React Query manages API state and caching
2. RESTful API endpoints handle CRUD operations
3. Type-safe requests using shared TypeScript schemas
4. Error handling with toast notifications

### Database Operations
1. Drizzle ORM provides type-safe database queries
2. PostgreSQL handles data persistence and relationships
3. Automatic migrations via Drizzle Kit
4. Connection pooling through Neon's serverless driver

### Authentication Flow
1. Session-based authentication with PostgreSQL storage
2. User credentials validated against database
3. Protected routes on both frontend and backend
4. Session persistence across browser sessions

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React Router, React Query
- **UI Components**: Radix UI primitives, Lucide React icons
- **Database**: Drizzle ORM, Neon Database, PostgreSQL
- **Development**: Vite, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, Zod for validation

### Third-party Services
- **Database Hosting**: Neon Database for serverless PostgreSQL
- **UI Components**: Shadcn/UI for modern component library
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod resolvers

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Environment-based DATABASE_URL configuration
- **Build Process**: TypeScript compilation and Vite bundling
- **Development Tools**: ESBuild for server bundling

### Production Deployment
- **Frontend**: Static build output served from `dist/public`
- **Backend**: Compiled JavaScript served from `dist/index.js`
- **Database**: PostgreSQL connection via environment variables
- **Process Management**: Single Node.js process serving both frontend and API

### Build Configuration
- **Client Build**: Vite builds React app to `dist/public`
- **Server Build**: ESBuild compiles TypeScript server to `dist/index.js`
- **Database Migrations**: Drizzle Kit handles schema migrations
- **Environment Variables**: Database URL and other configuration

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```