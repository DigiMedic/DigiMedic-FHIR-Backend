# Multi-stage build Dockerfile pro DigiMedic FHIR Backend
# Optimalizováno pro produkční nasazení s důrazem na bezpečnost a podporu českých certifikátů

# ============================================================================
# Stage 1: Build stage
# ============================================================================
FROM node:20-bullseye-slim AS builder

WORKDIR /app

# Kopírování package.json a lockfile
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Kopírování zdrojových kódů packages
COPY packages ./packages/

# Instalace závislostí a build
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && npm ci \
    && npm run build \
    && npm prune --production

# ============================================================================
# Stage 2: Production stage
# ============================================================================
FROM node:20-bullseye-slim

# Nastavení proměnných prostředí
ENV NODE_ENV=production \
    TZ=Europe/Prague \
    MEDPLUM_BASE_URL=https://api.digimedic.cz/fhir/R4 \
    PORT=8080

# Vytvoření neprivilegovaného uživatele
RUN groupadd -r digimedic && useradd -r -g digimedic -m -s /bin/bash digimedic

# Instalace CA certifikátů a balíčků potřebných pro české zdravotnické systémy
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    openssl \
    curl \
    tzdata \
    && rm -rf /var/lib/apt/lists/*

# Vytvoření adresářů pro certifikáty a data
RUN mkdir -p /app/certs /app/data /app/logs \
    && chown -R digimedic:digimedic /app

# Přepnutí na neprivilegovaného uživatele
USER digimedic
WORKDIR /app

# Kopírování buildu z předchozího stage
COPY --from=builder --chown=digimedic:digimedic /app/node_modules ./node_modules
COPY --from=builder --chown=digimedic:digimedic /app/packages/*/dist ./packages/
COPY --from=builder --chown=digimedic:digimedic /app/packages/*/package.json ./packages/

# Přidání českých CA certifikátů pro SÚKL, ÚZIS, a další systémy
# Poznámka: V produkčním prostředí nahraďte tyto příkazy skutečnými certifikáty
RUN mkdir -p /app/certs/sukl /app/certs/uzis /app/certs/nzis

# Přidání security hardening
RUN chmod -R 750 /app \
    && chmod -R 770 /app/logs /app/data

# Nastavení healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:${PORT}/healthcheck || exit 1

# Vystavení portu
EXPOSE ${PORT}

# Spuštění aplikace
CMD ["node", "packages/server/index.js"]
