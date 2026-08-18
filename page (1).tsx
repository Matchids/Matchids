import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin" };

const sections = [
  { href: "/admin/books", label: "Books", desc: "Add, edit and publish books." },
  { href: "/admin/kids-art", label: "Kids Art", desc: "Manage activities and categories." },
  { href: "/admin/users", label: "Users", desc: "View accounts and roles." },
  { href: "/admin/payments", label: "Payments", desc: "Review orders and transactions." },
  { href: "/admin/donations", label: "Donations", desc: "Review donation records." },
  { href: "/admin/campaigns", label: "Donation Campaigns", desc: "Create and manage campaigns." },
];

/**
 * This dashboard is an architectural placeholder: real admin auth
 * (role === "ADMIN" session check) must gate this whole /admin route group
 * before launch — see src/lib/auth/auth.ts. Wire that up as
 * src/app/admin/layout.tsx once real admin accounts exist.
 */
export default function AdminDashboardPage() {
  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-ink">Admin dashboard</h1>
        <p className="mt-2 text-sm text-ink/60">
          Manage everything on Matchids from one place.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="font-display text-lg font-bold text-ink">{s.label}</p>
              <p className="mt-1 text-sm text-ink/60">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
