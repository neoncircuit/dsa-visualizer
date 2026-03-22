FROM node:20-alpine AS build

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Install dependencies first (layer caching)
COPY package.json pnpm-lock.yaml* ./

# Use --no-frozen-lockfile as fallback when lockfile is missing or outdated,
# then regenerate it so subsequent builds can use --frozen-lockfile
RUN if [ -f pnpm-lock.yaml ]; then \
        pnpm install --frozen-lockfile || pnpm install; \
    else \
        pnpm install; \
    fi

# Copy source and build
COPY . .
RUN pnpm build

# ── Production Stage ──
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback: serve index.html for all routes
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
