# Backend Production Dockerfile
# Builds the backend and includes frontend static files

FROM node:20-alpine AS deps

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root package files for workspace setup
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ===== Frontend Builder =====
FROM node:20-alpine AS frontend-builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app/client

# Copy frontend dependencies from deps stage
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/client/node_modules ./node_modules

# Copy frontend source
COPY client/ ./

# Build frontend (creates dist folder)
RUN pnpm build

# ===== Backend Builder =====
FROM node:20-alpine AS backend-builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app/server

# Copy backend dependencies from deps stage
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/server/node_modules ./node_modules

# Copy backend source
COPY server/ ./

# Build backend TypeScript
RUN pnpm build

# ===== Production Runner =====
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules

# Copy built backend
COPY --from=backend-builder /app/server/dist ./server/dist
COPY --from=backend-builder /app/server/package.json ./server/

# Copy frontend built assets to where backend expects them
COPY --from=frontend-builder /app/client/dist ./client/dist

# Copy data files (card deck)
COPY server/src/data ./server/dist/data

WORKDIR /app/server

# Don't run as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/index.js"]
