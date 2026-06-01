# syntax=docker/dockerfile:1

# ---- Build stage: gera o Storybook estático ----
FROM node:20-alpine AS build
WORKDIR /app

# pnpm via corepack (mesma versão usada no CI de publish)
RUN corepack enable && corepack prepare pnpm@9 --activate

# Instala deps com cache da store do pnpm (precisa das devDependencies: storybook, vite, etc.)
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copia o restante e builda
COPY . .
RUN pnpm run build-storybook   # gera ./storybook-static

# ---- Runtime stage: serve os estáticos com nginx ----
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
