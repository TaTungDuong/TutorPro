# ===== deps =====
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# Prisma + dev watch tools need OpenSSL + procps(ps)
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
     openssl \
     libssl3 \
     ca-certificates \
     procps \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci || npm install

# ===== dev =====
FROM node:20-bookworm-slim AS dev
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
     openssl \
     libssl3 \
     ca-certificates \
     procps \
  && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && npm run start:dev"]
