# Database Operations

The canonical Prisma schema remains at [`../schema.prisma`](../schema.prisma), preserving the existing project entry point. Prisma migrations live in the adjacent [`../migrations/`](../migrations/) directory. The schema includes parent accounts, books, moderated artwork, products, orders, payments, donations, and contact messages.

## Migration history

No production migration history, database URL, or verified live schema was available. The contact-message migration is additive and creates only its new enums, table, and indexes; it does not baseline or alter existing tables. It can be applied to an existing database only after the actual database has been backed up and Prisma migration history has been reviewed.

For a disposable local database, `npm run db:push` can synchronize the current schema. Do not use `db push` against production.

Before production changes:

1. Take a restorable backup and obtain a read-only view of the existing production schema.
2. Compare that schema with `schema.prisma`, including the new content moderation, product/order, and contact-message models.
3. Establish a Prisma migration baseline for the real database; do not mark a migration applied unless the live schema exactly matches it.
4. Review the additive contact migration against a production-like staging clone.
5. Test backup restoration and the application against the migrated clone.
6. Only then run `prisma migrate deploy` in production through the deployment process.

Until that baseline exists and is verified, production database rollout is blocked. `seed.ts` is development-only and refuses to run in production.