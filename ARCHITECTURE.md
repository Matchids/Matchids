# Architecture

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** custom JWT session (see `src/lib/auth`) — swap for a provider
  (NextAuth, Clerk, etc.) if preferred; the interface is small on purpose
- **Payments:** provider-agnostic abstraction (see `src/lib/payments`)

## Folder structure

```
src/
  app/            Route segments (App Router) — one folder per page
    api/          Route handlers (backend logic, never trust client input)
    admin/        Admin dashboard route group
  components/     UI components, grouped by feature area
  lib/
    payments/     Payment abstraction: types, PaymentService, providers/
    db/           Prisma client singleton
    auth/         Session/password primitives
  data/           DEMO-ONLY seed content, clearly marked isDemoContent
  types/          Shared TypeScript types
  styles/         Global CSS
prisma/
  schema.prisma   Single source of truth for the database schema
docs/             Architecture, CeloHT integration, and process docs
tests/            Vitest unit tests
```

## Payment architecture

Traditional (card) and Web3 (CeloHT) payments are kept as two
implementations of the same `PaymentProvider` interface
(`src/lib/payments/types.ts`). `PaymentService` is the only thing checkout
code talks to — it doesn't know or care which provider is behind a payment
method. This means:

- Adding a second card processor, or a second Web3 provider, means adding
  one file to `src/lib/payments/providers/` and registering it in
  `PaymentService` — nothing else changes.
- **The frontend never marks a payment as successful.** Every provider's
  `verifyTransaction()` runs server-side, in `/api/payments/webhook` (for
  processor webhooks) or wherever the provider requires. Access to a
  purchased book, or confirmation of a donation, only happens after that
  server-side verification succeeds.

See `docs/CELOHT_INTEGRATION.md` for CeloHT specifics.

## Data model

See `prisma/schema.prisma`. Entities are kept close to what the product
actually needs today: `User`, `Book`, `Category`, `Artwork`, `Order`,
`Payment`, `PaymentTransaction`, `Donation`, `DonationCampaign`,
`UserLibrary`, plus `VerifiedOrganization` and `ImpactReport` for Give Back
reporting once that data is real.

## What's intentionally left as a placeholder

- Admin route auth gating (`src/app/admin/**`) — needs a real ADMIN-role
  session check before launch.
- Card processor SDK wiring (`StripeProvider` is a structurally-correct
  stub).
- CeloHT API calls and on-chain verification (`CeloHTProvider`).
- File storage for book PDFs / cover images / kids-art uploads.

Each of these is marked in code with a comment explaining exactly what to
implement — see the "Integration point" comments throughout
`src/lib/payments/` in particular.
