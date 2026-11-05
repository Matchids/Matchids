# Architecture

## Runtime

- Next.js 14 App Router and TypeScript live in `src/app/`.
- Shared site, catalog, account, and cart UI lives in `src/components/`.
- Server-side authentication, Prisma access, and payment orchestration live in `src/lib/`.
- PostgreSQL is modeled by the root `schema.prisma`; `database/README.md` documents the missing migration baseline.
- The official logo is served from `public/logo/`.

## Content

Public book queries use `publishedAt != null` and exclude `isDemoContent`. Local demo books are only used when no database URL is configured outside production, and the UI marks them as samples. Artwork and products are returned publicly only when their `ContentStatus` is `PUBLISHED` and they are not demo records. The states are `DRAFT`, `IN_REVIEW`, `PUBLISHED`, and `ARCHIVED`.

The current admin route enforces the current database role on the server, but it does not yet expose content management or moderation actions. Schema support is not a substitute for an operational review workflow.

## Authentication

Registration creates parent/guardian accounts only. Passwords are bcrypt-hashed, and signed sessions use `httpOnly`, `sameSite=lax` cookies with `secure` enabled in production. Mutating account routes validate same-origin requests and their inputs. Protected account and admin pages load the current user from PostgreSQL; admin access checks the current database role rather than relying only on a token claim.

Production gaps include distributed rate limiting, email verification, password reset/recovery, admin provisioning workflow, and legal review of child privacy requirements.

## Payments

`src/lib/payments/types.ts` defines the provider contract. `PaymentService` owns provider selection. Card and CeloHT classes intentionally report unavailable until real intent creation and independent server-side verification are implemented. The API does not create orders or donations, and the UI never reports a payment as successful.

CeloHT support is limited to the intended CELO/USDm provider boundary. No contract address, API endpoint, ABI, or network verification logic is invented. cUSD is not configured.

## Data and APIs

Public read APIs expose only book, artwork, and product catalog data. Account APIs return only the signed-in user's safe profile fields. Donations and payment intent endpoints fail closed while providers are unavailable. No uploads, public child profiles, child messaging, or ad targeting are enabled.

## Production constraints

- PostgreSQL must be provisioned and schema migrations baselined against the real environment.
- Payment, email, and storage providers must be selected and verified.
- Admin management and moderation tooling must be built and audited.
- Authentication abuse protection and recovery flows must be added.
- Legal notices and child-safety procedures require jurisdiction-specific review.
- Responsive visual checks in real browsers and end-to-end account/payment tests remain required before launch.