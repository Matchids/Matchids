# Matchids

**A digital world where children learn, imagine, create, and give.**

Matchids is a family-focused learning and creativity platform founded by Suzie Matchilda George. This repository is the single application repository for the website, API routes, database schema, authentication, and payment-provider boundary.

## Current status

The public website and core application foundations are implemented, but this repository is **not production-ready**. Published database content, account flows, and admin authorization require a configured PostgreSQL database. Online purchases, donations, contact delivery, uploads, and content-management actions remain unavailable until their real providers and server-side workflows are implemented and verified.

Sample books are local-development fixtures, labeled as samples. Sample art is not published. No fake products, orders, payments, donations, partners, or impact figures are included.

## Repository scope

The GitHub Matchids namespace currently exposes this `Matchids/Matchids` application repository and the shared `.github` repository. The organization profile describes other possible repositories as an ecosystem plan, but those repositories are not currently available. The shared profile references the official Matchids logo; that existing asset is centralized in `public/logo/`.

## Architecture

```text
src/app/                 Next.js routes, pages, API handlers, metadata
src/components/          Shared navigation, catalog, account, and cart UI
src/lib/auth/            Password and session primitives; user lookup
src/lib/db/              Prisma singleton
src/lib/payments/        Provider interface and orchestration
payments/card/           Card-provider boundary (currently unavailable)
payments/celoht/         CeloHT boundary (currently unavailable)
src/data/                Clearly marked local demo fixtures
schema.prisma            PostgreSQL schema (Prisma)
public/logo/             Official Matchids logo asset
database/                Migration and database rollout notes
```

The project uses Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma/PostgreSQL, and Vitest. The schema remains at the repository root to preserve its existing Prisma entry point.

## Local development

Prerequisites: Node.js 24 and npm. Copy `.env.example` to `.env`, set a local PostgreSQL `DATABASE_URL`, and generate an `AUTH_SECRET` with at least 32 characters:

```bash
cp .env.example .env
openssl rand -base64 32
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

`db:push` is for a disposable local development database only. Do not use it to update production. `db:seed` refuses to run when `NODE_ENV=production` and inserts only clearly marked demo records. The website is available at `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The GitHub Actions workflow runs these checks with `npm ci`. Keep `package-lock.json` committed and updated with dependency changes so local, CI, and production installs resolve the same versions.

## GitHub Pages preview

The repository deploys a static public preview from [`github-pages/`](github-pages/) to https://matchids.github.io/Matchids/. A push to `main` that changes the preview, its logo assets, or its deployment workflow triggers the Pages workflow. The Next.js application remains the full server-backed product; GitHub Pages cannot run its database, authentication, payment, or API routes. The preview calls out those unavailable services and does not simulate sign-in, purchases, or donations. Check the `Deploy Matchids to GitHub Pages` workflow in Actions for the deployment result.

## Runtime health checks

On a Node.js deployment, `GET /health` is a liveness probe and returns only a generic process status. `GET /ready` checks PostgreSQL with a minimal query and returns `503` without exposing connection details when the database is unavailable. GitHub Pages is static and cannot serve either route.

## Configuration and launch blockers

| Service | Missing | Why it is required | Configuration and verification |
|---|---|---|---|
| PostgreSQL | A provisioned database and reviewed migration baseline | Accounts, published catalog, products, and admin roles are database-backed | Set `DATABASE_URL`; migrate a staging database and verify reads/writes before production |
| Card payments | Processor SDK, webhook signature verification, refunds, and sandbox credentials | A secret key alone cannot create or verify an order payment | Choose a processor, implement its server adapter, configure the `STRIPE_*` values, and test signed sandbox events end to end |
| CeloHT | Real API details and server-side transaction verification | No endpoint, contract, ABI, or verification behavior is present in the available sources | Obtain official integration documentation, configure `CELOHT_*`, and test CELO/USDm on an approved test environment; current provider always reports unavailable |
| Email/contact | Verified sender, delivery provider, abuse controls, and support inbox | Contact, verification, and recovery messages must be delivered and handled | Configure `EMAIL_FROM_ADDRESS` and `EMAIL_PROVIDER_API_KEY`, then verify delivery and failure handling |
| File storage | Private object storage, signed uploads/downloads, and file scanning | Book files and child-related artwork must not be exposed through unsafe uploads | Configure a storage provider and test authorization, content-type limits, scanning, and deletion |
| Admin operations | Secure admin provisioning and management UI/API | Hiding a link is not authorization; content needs a real moderation workflow | Provision an ADMIN role through a controlled database procedure; implement and test audited management actions |
| Abuse protection | Distributed rate limiting and account recovery/verification | Authentication endpoints are not protected by a shared rate limiter; no email verification or password reset exists | Add an edge/shared rate-limit store and email flows; test brute-force and recovery paths |
| Legal/privacy | Jurisdiction-reviewed terms and child privacy notices | The current policy pages are prelaunch drafts, not legal advice | Obtain qualified review and publish region-specific notices before serving families |
| Brand metadata | Production domain and optimized logo variants | Canonical URLs and social sharing need the verified production domain | Set `NEXT_PUBLIC_APP_URL`; the original official logo is used pending approved optimized variants |

The migration folder is intentionally not fabricated: no production database or prior migration history was available to baseline. Read [`database/README.md`](database/README.md) before creating or applying migrations.

## Security notes

- Parent/guardian signup only; no child profile fields or public child profiles.
- Passwords use bcrypt; session cookies are `httpOnly`, `sameSite=lax`, and secure in production.
- Admin pages query the current database role on the server.
- Payment providers are unavailable until their intent and verification implementations exist; frontend input never marks a payment successful.
- Public artwork queries require `PUBLISHED` status and exclude demo content.
- No file upload, third-party advertising, or child-to-child messaging feature is enabled.
- Authentication rate limiting, email verification, password recovery, and a completed production security review remain launch blockers.

## Payments

The provider interface supports card and CeloHT adapters. The CeloHT strategy is CELO and USDm; cUSD is not configured. Both provider implementations currently return unavailable and the API refuses to create intents. See [`CELOHT_INTEGRATION.md`](CELOHT_INTEGRATION.md).

## License

MIT. See [`LICENSE`](LICENSE).