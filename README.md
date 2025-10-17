
# Telegram Bot

Scaffold en **Node.js 22 + TypeScript** con **Arquitectura Hexagonal**, **Inversify**,
**AWS Lambda + API Gateway (webhook)**, **grammY**, y testing con **Jest + Sinon + Supertest**.
Incluye **CI/CD GitHub Actions con OIDC** (multi-entorno) + **cleanup** de stacks efímeros y
publicación de la **URL del webhook** tras el deploy.

## Requisitos
- Node 22+
- Serverless Framework (`npm i -g serverless`)
- Cuenta AWS con IAM Role para GitHub OIDC

## Variables de entorno
Copia `.env.example` a `.env` y completa:
```
TELEGRAM_BOT_TOKEN=
ADMIN_TELEGRAM_ID=
PORT=3000
MODE=paper
INTERVAL_MINUTES=15
BOT_BIN=/app/trading-bot
```

## Scripts
- `npm run dev` – Levanta `serverless-offline` para `/webhook`, `/healthz`, `/readyz`.
- `npm run build` – Compila TypeScript a `dist/`.
- `npm test` – Ejecuta Jest.
- `npm run deploy` – Despliega a AWS (serverless).
- `npm run remove` – Elimina el stack.

## Endpoints
- `POST /webhook` — Telegram enviará updates aquí.
- `GET  /healthz` — Liveness probe.
- `GET  /readyz` — Readiness probe (consulta DbConnector stub).

## Estructura (Hexagonal)
```
src/
  application/        # Casos de uso / servicios de aplicación
  domain/             # Interfaces del dominio
  infrastructure/     # Adapters a tecnologias (HTTP, Telegram, DB stub)
    http/handlers/    # Lambda handlers
    telegram/         # Adapter grammY
    db/               # Conector placeholder
  app/                # Bootstrap IoC (Inversify)
  config/             # Carga/env
  utils/              # Logger, helpers
  types/              # Tipos/identificadores IoC
```

## Webhook de Telegram
1. Despliega.
2. Copia la URL del `/webhook` desde el **Job Summary** del pipeline (o `serverless info`).
3. Registra el webhook: `https://api.telegram.org/bot<token>/setWebhook?url=<https-endpoint>`

## CI/CD con GitHub Actions (OIDC)
- Workflow: `.github/workflows/deploy.yml`
  - PR → `--stage pr-<num>` (efímero)
  - Ramas ≠ main → `--stage dev`
  - main → `--stage prod`
  - Publica la URL del `/webhook` en el **Step Summary**.
- Limpieza: `.github/workflows/cleanup.yml` (al cerrar PR → `serverless remove` del `pr-<num>`)
- IAM docs: `infra/iam/` con trust/permissions y README.

## Testing
- Unit: servicios y utils con **Jest + Sinon**.
- Integration: handlers HTTP como funciones puras; Supertest listo si montas un server local.
