# Multi-stage build for optimized production image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies and create non-root user for security
RUN apk add --no-cache dumb-init
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Install dependencies for builder
FROM base AS builder
COPY package*.json ./
RUN npm ci

# Copy configuration and source files
COPY next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs components.json ./
COPY src ./src
COPY public ./public

# Build the application
RUN npm run build

# Production stage
FROM base AS runner
ENV NODE_ENV=production

# Install wget for health checks
RUN apk add --no-cache wget

# Copy node modules from builder stage
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
