# Base image with common dependencies
FROM node:20-alpine AS base

# Install essential tools and dependencies
RUN apk add --no-cache \
    curl \
    libc6-compat \
    # Add any other tools you need
    && corepack enable \
    && corepack prepare pnpm@latest --activate

WORKDIR /app

# Dependencies stage - Optimized for caching
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS runner
RUN apk add --no-cache curl

WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=development \
    PORT=3000 \
    HOST=0.0.0.0

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

# Start development server
CMD ["sh", "-c", "pnpm install && pnpm dev"]
