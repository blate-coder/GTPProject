# Architecture Overview

## Overview

This repository contains a Japanese language learning application built with a modern full-stack architecture. The application allows users to learn Japanese through interactive lessons based on popular songs and anime, take quizzes to test their knowledge, track their progress, and view analytics of their learning journey.

The system follows a client-server architecture with a clear separation between the frontend (client) and backend (server) components. It uses modern web technologies and follows industry best practices for structure, security, and performance.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

```
/
├── client/            # Frontend React application
│   ├── src/           # React source code
│   │   ├── components/# UI components
│   │   ├── hooks/     # Custom React hooks
│   │   ├── lib/       # Utility functions
│   │   └── pages/     # Page components
├── server/            # Backend Express server
│   ├── data/          # Static data (lessons, quizzes)
│   └── index.ts       # Server entry point
├── shared/            # Shared code between client and server
│   └── schema.ts      # Database schema definitions
└── migrations/        # Database migrations
```

### Technology Stack

- **Frontend**: React with TypeScript, TailwindCSS, ShadCN UI components
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based authentication with Passport.js
- **State Management**: React Query for server state, React Context for global state
- **Routing**: Wouter for client-side routing
- **Styling**: TailwindCSS with a theme system
- **Build Tools**: Vite for frontend, ESBuild for backend

## Key Components

### Frontend Architecture

The frontend is built with React and follows a component-based architecture with clear separation of concerns:

1. **Pages**: Top-level components that correspond to routes in the application
   - Home page: Displays available lessons
   - Lesson page: Shows lesson content with media and text
   - Quiz page: Interactive quizzes based on lessons
   - Analytics page: User progress and performance metrics
   - Login/Signup pages: User authentication

2. **Components**: Reusable UI components organized by functionality
   - UI components: Based on ShadCN/UI library with Radix UI primitives
   - Feature components: Domain-specific components like LessonCard, JapaneseText, etc.

3. **Hooks**: Custom React hooks for reusable logic
   - `useAuth`: Authentication state and methods
   - `useToast`: Toast notification system
   - `useMobile`: Responsive design detection

4. **State Management**:
   - React Query for server state (lessons, quizzes, user data)
   - React Context for global state (auth, theme)

### Backend Architecture

The backend is built with Express.js and follows a modular architecture:

1. **API Routes**: REST endpoints for frontend consumption
   - `/api/lessons`: CRUD operations for lessons
   - `/api/quizzes`: Quiz retrieval and submission
   - `/api/user`: User authentication and profile management
   - `/api/progress`: User progress tracking
   - `/api/scores`: Quiz score recording and analytics

2. **Authentication**: Session-based auth with Passport.js
   - Local strategy for username/password
   - Session storage in PostgreSQL
   - Password hashing with scrypt

3. **Storage Layer**: Abstraction over database operations
   - Drizzle ORM for type-safe database access
   - Memory fallback for development/testing

### Database Schema

The database uses PostgreSQL and is modeled with the following tables:

1. **users**: User account information
   - id: Primary key
   - username: Unique username
   - password: Hashed password
   - progress: JSON field for tracking lesson/quiz progress

2. **lessons**: Japanese language lessons
   - id: Primary key
   - title: Lesson title
   - description: Description
   - type: "song" or "anime"
   - mediaUrl: YouTube embed URL
   - content: JSON field with lyrics, translations, and vocabulary
   - difficulty: Difficulty level

3. **quizzes**: Quizzes associated with lessons
   - id: Primary key
   - lessonId: Foreign key to lessons
   - questions: JSON field with quiz questions
   - tags: JSON array for categorization

4. **scores**: User quiz results
   - id: Primary key
   - userId: Foreign key to users
   - quizId: Foreign key to quizzes
   - score: Points earned
   - maxScore: Maximum possible points
   - percentage: Score as percentage
   - completedAt: Timestamp

## Data Flow

### Authentication Flow

1. User submits credentials via login form
2. Server validates credentials and creates a session
3. Session ID is stored in a cookie
4. Subsequent requests include the cookie for authentication
5. Protected routes check for valid session

### Lesson and Quiz Flow

1. User browses available lessons on the home page
2. User selects a lesson to view content (video/audio + text)
3. User takes a quiz associated with the lesson
4. Quiz answers are submitted to the server for scoring
5. Results are stored in the database and displayed to the user
6. User progress is updated

### Analytics Flow

1. User views their analytics page
2. Server queries the scores table for the user's performance data
3. Data is processed and sent to the client
4. Client renders visualizations of the user's progress

## External Dependencies

### Frontend Dependencies

- **UI Framework**: React with TypeScript
- **Styling**: TailwindCSS, class-variance-authority, clsx
- **Components**: Radix UI primitive components for accessible UI
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod for validation
- **Date Handling**: date-fns
- **Charts**: Recharts for data visualization

### Backend Dependencies

- **Server**: Express.js
- **Database**: Drizzle ORM with PostgreSQL via Neon Serverless
- **Authentication**: Passport.js with express-session
- **Security**: Node's crypto module for password hashing
- **Session Storage**: PostgreSQL session store

## Deployment Strategy

The application is configured for deployment on Replit with specific optimizations:

1. **Build Process**:
   - Frontend: Built with Vite
   - Backend: Bundled with ESBuild
   - Combined into a single deployment package

2. **Database**:
   - Uses Neon Serverless PostgreSQL (indicated by @neondatabase/serverless dependency)
   - Connection pooling for efficient database access

3. **Environment Configuration**:
   - Environment variables for database connection and secrets
   - Production/development mode detection

4. **Static Assets**:
   - Frontend assets served by Express in production
   - Vite dev server with HMR in development

5. **Containerization**:
   - Configured for deployment on Replit's Cloud Run infrastructure

## Security Considerations

1. **Authentication**: 
   - Password hashing with scrypt and salting
   - CSRF protection via same-site cookies
   - Session timeout and secure cookie settings

2. **API Security**:
   - Input validation with Zod schemas
   - Error handling that prevents leaking sensitive information

3. **Frontend Security**:
   - Content Security Policy for media embedding
   - Safe handling of user-generated content

## Future Extensibility

The architecture is designed to be extensible in several ways:

1. **Content Types**: The schema supports various types of learning content (currently songs and anime)

2. **Quiz Types**: The tagging system allows for categorization of quizzes (grammar, vocabulary, etc.)

3. **User Progression**: The progress tracking system supports complex learning paths

4. **Analytics**: The scoring system captures detailed metrics for future enhancement of analytics