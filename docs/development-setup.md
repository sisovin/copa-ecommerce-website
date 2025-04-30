# Development Setup Guide

This guide will help you set up the development environment for the Copa E-Commerce Website.

## Prerequisites

- Node.js (v16 or later)
- pnpm (v6 or later)
- Docker
- PostgreSQL

## Initial Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```

## Database Setup

1. Start PostgreSQL using Docker:
   ```sh
   docker-compose up -d
   ```

2. Initialize Prisma:
   ```sh
   pnpm --filter @copa/server run prisma:generate
   ```

3. Run database migrations:
   ```sh
   pnpm --filter @copa/server run prisma:migrate
   ```

## Running the Applications

1. Start the backend server:
   ```sh
   pnpm --filter @copa/server run start:dev
   ```

2. Start the frontend application:
   ```sh
   pnpm --filter @copa/frontend run dev
   ```

## Building the Applications

1. Build shared libraries:
   ```sh
   pnpm --filter @copa/shared-types run build
   ```

2. Build the backend:
   ```sh
   pnpm --filter @copa/server run build
   ```

3. Build the frontend:
   ```sh
   pnpm --filter @copa/frontend run build
   ```

## Additional Resources

- [API Reference](api-reference.md)
- [Component Library Documentation](component-library.md)
- [Contribution Guidelines](contribution-guidelines.md)
