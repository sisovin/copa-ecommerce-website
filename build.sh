#!/bin/bash

# Build script for Copa E-Commerce Website

# Exit on error
set -e

# Build shared libraries
echo "Building shared libraries..."
pnpm --filter @copa/shared-types run build

# Build backend
echo "Building backend..."
pnpm --filter @copa/server run build

# Build frontend
echo "Building frontend..."
pnpm --filter @copa/frontend run build

echo "Build completed successfully."
