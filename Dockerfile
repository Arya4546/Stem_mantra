# STEMmantra website — one image: the Express API (backend/) serving the Next.js site (frontend/).
# Built by GitHub Actions (.github/workflows/deploy.yml) and pulled on the VPS; see README.md.
#
# Dependencies are installed in stages that depend only on the lockfiles, so those large layers
# stay identical between builds and a normal deploy only downloads the new build output.

# ── Frontend: dependencies (one install), production subset, build ──
FROM node:22-alpine AS frontend-deps-all
RUN apk add --no-cache libc6-compat
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

FROM frontend-deps-all AS frontend-deps
# Production dependencies only. The SWC compiler (~150 MB) is used by `next build`, not by the server.
RUN npm prune --omit=dev && rm -rf node_modules/@next/swc-*

FROM frontend-deps-all AS frontend-build
ENV NEXT_TELEMETRY_DISABLED=1
COPY frontend/ ./
RUN npm run build && rm -rf .next/cache && mkdir .next/cache

# ── Backend: dependencies (+ generated Prisma client), production subset, build ──
FROM node:22-alpine AS backend-deps-all
RUN apk add --no-cache openssl
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
# The schema must be present: npm's postinstall runs `prisma generate`.
COPY backend/prisma ./prisma
RUN npm ci

FROM backend-deps-all AS backend-deps
RUN npm prune --omit=dev

FROM backend-deps-all AS backend-build
COPY backend/ ./
RUN npm run build

# ── Runtime ─────────────────────────────────────────────────────────
FROM node:22-alpine
# openssl: Prisma engines · libc6-compat: native binaries (sharp)
RUN apk add --no-cache openssl libc6-compat
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    FRONTEND_DIR=/app/frontend
WORKDIR /app

# Rarely-changing layers first (dependencies, static files), build output last.
COPY --from=frontend-deps /app/frontend/node_modules ./frontend/node_modules
COPY --from=backend-deps /app/backend/node_modules ./backend/node_modules
COPY frontend/public ./frontend/public
COPY frontend/package.json frontend/next.config.js ./frontend/
COPY backend/package.json ./backend/
COPY backend/prisma ./backend/prisma
# Next.js writes optimised images (and any on-demand pages) under .next at runtime.
COPY --from=frontend-build --chown=node:node /app/frontend/.next ./frontend/.next
COPY --from=backend-build /app/backend/dist ./backend/dist

USER node
WORKDIR /app/backend
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --start-interval=5s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1:3000/api/health || exit 1

# Apply pending migrations (this also creates the database on the first run), then start.
# `exec` replaces the shell with node, so `docker stop` (SIGTERM) reaches the graceful shutdown.
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && exec node dist/server.js"]
