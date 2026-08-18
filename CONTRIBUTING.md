# Contributing to Matchids

Thanks for considering a contribution to Matchids — a platform built for
children, parents and communities.

## Ground rules

- **Never commit secrets.** API keys, private wallet keys, and credentials
  belong in environment variables only — see `.env.example`.
- **Never invent data.** No fake statistics, testimonials, partner
  organizations, orphanages, donation numbers, contract addresses, ABIs, or
  API endpoints. If something isn't real yet, mark it clearly as an
  integration point (see `src/lib/payments/providers/CeloHTProvider.ts` for
  the pattern).
- **Content involving children stays age-appropriate.** Anything touching
  Books or Kids Art should be reviewed with that in mind — see
  `docs/CHILD_SAFETY_NOTES.md`.

## Getting started

1. Fork and clone the repository.
2. `cp .env.example .env` and fill in the values you have.
3. `npm install`
4. `npm run db:push` (requires a Postgres database — see README).
5. `npm run dev`

## Before opening a PR

- `npm run lint`
- `npm run typecheck`
- `npm test`
- Fill out the PR template checklist.

## Code style

- TypeScript everywhere, strict mode.
- Keep components small and reusable; avoid unnecessary abstraction.
- Prefer editing an existing pattern over introducing a new one — e.g. new
  payment providers implement `PaymentProvider` rather than adding one-off
  logic to checkout.
