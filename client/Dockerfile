# Frontend Production Dockerfile
# Builds the React app and outputs static files

FROM node:18-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app (creates dist/ folder)
RUN pnpm build

# The output will be in /app/dist
# This stage just builds - backend will serve these files
