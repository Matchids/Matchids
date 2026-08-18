# Matchids

**A Digital World Where Children Learn, Imagine, Create and Give**

Matchids is an international digital platform for children, parents and
communities — built around a growing library of free and premium books, a
Kids Art creative space, and a Give Back program supporting children in
orphanages who need it most.

Founded by **Suzie Matchilda George**.

## Vision

Matchids brings together:

- **Learn** — a digital book library, free and premium, organized by age,
  category and language
- **Imagine** — Kids Art: coloring pages, activities and creative prompts
- **Create** — a platform designed to grow with real content, not
  placeholders
- **Give** — the Give Back program, directing support toward children in
  orphanages, built openly and only ever reporting real, verified data

## Features

| Area | Status |
|---|---|
| Book library (browse, search, filter, detail pages) | Implemented, seeded with demo content |
| Free vs. premium access | Implemented |
| Kids Art | Implemented, seeded with demo content |
| Give Back / donation flow | Implemented (payment confirmation pending real processor) |
| Card payments | Architecture in place; processor SDK is an integration point |
| CeloHT (CELO / USDm on Celo) | Architecture in place; API is an integration point — see [`docs/CELOHT_INTEGRATION.md`](docs/CELOHT_INTEGRATION.md) |
| User accounts & library | Architecture + schema in place |
| Admin dashboard | Route structure in place; needs real auth gating + data wiring |
| i18n (English / French / Haitian Creole) | Locale field on User; UI copy currently English-only, structured to translate |

## Technology stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **PostgreSQL** + **Prisma ORM**
- **Vitest** for tests
- Deployable to any Node-compatible host (Vercel, Render, Fly, etc.)

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full breakdown.

## Local development

```bash
git clone https://github.com/<your-org>/matchids.git
cd matchids
cp .env.example .env      # fill in what you have; see comments in the file
npm install
npm run db:generate
npm run db:push           # requires a running Postgres instance
npm run dev
```

The app runs at `http://localhost:3000`.

### Environment variables

All configuration lives in `.env` (see `.env.example` for the full list
with explanations). Nothing in this repository ships with real secrets —
card processor keys and CeloHT credentials are integration points you fill
in yourself.

### Testing

```bash
npm test          # run once
npm run test:watch
```

### Linting & type checking

```bash
npm run lint
npm run typecheck
```

### Build

```bash
npm run build
npm start
```

## Deployment

Any Node 18+ host works. Set the environment variables from `.env.example`
in your hosting provider, point `DATABASE_URL` at a production Postgres
instance, and run `npm run build && npm start` (or use the platform's
Next.js integration, e.g. Vercel).

## Security

- No secrets, API keys, or private wallet keys are committed to this
  repository — see `.gitignore` and `.env.example`.
- Payment verification always happens server-side (see
  [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#payment-architecture)) —
  the frontend is never trusted to declare a payment successful.
- Report vulnerabilities per [`.github/SECURITY.md`](.github/SECURITY.md).

## Payment architecture

Card and Web3 (CeloHT) payments share one provider-agnostic interface, so
new payment methods can be added without touching checkout logic. Full
details in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## CeloHT integration

CeloHT is a dapp for sending and receiving CELO and USDm on the Celo
blockchain, integrated as a Web3 payment provider. See
[`docs/CELOHT_INTEGRATION.md`](docs/CELOHT_INTEGRATION.md) for exactly
what's implemented, what's a placeholder, and what to fill in once real
API details are available.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). In short: never commit secrets,
never invent data (statistics, testimonials, partners, contract addresses),
and keep content appropriate for children.

## License

MIT — see [`LICENSE`](LICENSE).
