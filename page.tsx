import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin · Users" };

/**
 * Structural placeholder for the Users admin screen: table/list +
 * create/edit form, backed by the corresponding Prisma model. Gate this
 * route behind an ADMIN-only session (see src/lib/auth/auth.ts) before
 * connecting it to real data.
 */
export default function AdminUsersPage() {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-2xl font-bold text-ink">Users</h1>
        <p className="mt-2 text-sm text-ink/60">
          No users to show yet — this screen is ready to connect to the database.
        </p>
      </div>
    </section>
  );
}
