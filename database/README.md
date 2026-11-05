# Database Operations

The canonical Prisma schema remains at [`../schema.prisma`](../schema.prisma), preserving the existing project entry point. The current schema includes parent accounts, books, moderated artwork, products, orders, payments, and donations.

## Migration history

No migration directory or production migration history was present in the available repositories. A production database URL and a verified live schema were also unavailable. For that reason, this repository does not invent an initial migration or claim that the current schema has been applied to any existing database.

For a disposable local database, `npm run db:push` can synchronize the current schema. Do not use `db push` against production.

Before production changes:

1. Take a restorable backup and obtain a read-only view of the existing production schema.
2. Compare that schema with `schema.prisma`, including the new content moderation and product/order models.
3. Establish a Prisma migration baseline for the real database; do not mark a migration applied unless the live schema exactly matches it.
4. Generate and review additive SQL migrations against a production-like staging clone.
5. Test backup restoration and the application against the migrated clone.
6. Only then run `prisma migrate deploy` in production through the deployment process.

Until that baseline exists and is verified, production database rollout is blocked. `seed.ts` is development-only and refuses to run in production.