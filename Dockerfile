FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Copy configuration files
COPY next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs components.json ./

# Copy source code only (explicitly avoid node_modules and .next)
COPY src ./src
COPY public ./public

# Build the application
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy package files and install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
