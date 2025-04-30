# Dockerfile for Copa E-Commerce Website

# Stage 1: Build the frontend
FROM node:16-alpine AS build-frontend
WORKDIR /app
COPY apps/frontend/package.json apps/frontend/package-lock.json ./
RUN npm install
COPY apps/frontend ./
RUN npm run build

# Stage 2: Build the backend
FROM node:16-alpine AS build-backend
WORKDIR /app
COPY apps/server/package.json apps/server/package-lock.json ./
RUN npm install
COPY apps/server ./
RUN npm run build

# Stage 3: Production image
FROM node:16-alpine
WORKDIR /app

# Copy frontend build
COPY --from=build-frontend /app/.next ./.next
COPY --from=build-frontend /app/public ./public

# Copy backend build
COPY --from=build-backend /app/dist ./dist

# Install production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Expose ports
EXPOSE 3000 4000

# Start the application
CMD ["npm", "start"]
