# Copa E-Commerce Website

## Monorepo Setup
- Initialize monorepo with `pnpm init`
- Create `pnpm-workspace.yaml`
- Set up root `.gitignore`
- Create root `README.md`
- Configure root `package.json` scripts
- Set up shared `tsconfig.json`

## Shared Libraries
- Create `libs/shared-types` for TypeScript interfaces
- Set up type sharing between frontend and backend
- Configure build process for shared libraries

## Database Setup
- Create `docker-compose.yml` for PostgreSQL
- Initialize Prisma in `/apps/server`
- Define database schema in `schema.prisma`
- Set up Prisma client and service
- Create initial migrations

## Backend (NestJS)
### Core Setup
- Initialize NestJS app with strict TypeScript
- Configure `nest-cli.json`
- Set up global pipes and filters
- Create base `AppModule`

## Frontend (Next.js 15)
### Project Setup
- Initialize Next.js app with TypeScript
- Configure `next.config.js`
- Set up Tailwind CSS (or preferred framework)
- Create base layout component

## Deployment
- Dockerize applications
- Set up production database
- Configure environment variables
- Prepare build scripts
- Deployment documentation

## Documentation
- API reference
- Component library docs
- Development setup guide
- Contribution guidelines
