import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const metadata: Metadata = { title: "Your account", robots: { index: false, follow: false } };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/sign-in?next=%2Faccount");
  let library: { book: { title: string; author: string } }[] = [];
  let orders: { id: string; totalCents: number; currency: string; createdAt: Date }[] = [];
  let historyAvailable = true;

  try {
    const accountData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        library: { select: { book: { select: { title: true, author: true } } } },
        orders: {
          where: { status: "PAID" },
          select: { id: true, totalCents: true, currency: true, createdAt: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    library = accountData?.library ?? [];
    orders = accountData?.orders ?? [];
  } catch {
    historyAvailable = false;
  }

  return (
    <section className="page-wrap account-page">
      <p className="eyebrow">Family account</p>
      <h1>Hello, {user.displayName}</h1>
      <dl className="account-facts">
        <div><dt>Email</dt><dd>{user.email}</dd></div>
        <div><dt>Account type</dt><dd>Parent or guardian</dd></div>
      </dl>
      <section className="account-history">
        <h2>Your library</h2>
        {!historyAvailable ? <p>Library information is temporarily unavailable.</p> : library.length ? (
          <ul>{library.map((entry, index) => <li key={`${entry.book.title}-${index}`}>{entry.book.title} · {entry.book.author}</li>)}</ul>
        ) : <p>Your library is empty.</p>}
      </section>
      <section className="account-history">
        <h2>Purchases</h2>
        {!historyAvailable ? <p>Purchase history is temporarily unavailable.</p> : orders.length ? (
          <ul>{orders.map((order) => <li key={order.id}>{new Date(order.createdAt).toLocaleDateString()} · {(order.totalCents / 100).toLocaleString(undefined, { style: "currency", currency: order.currency })}</li>)}</ul>
        ) : <p>No completed purchases.</p>}
      </section>
      <SignOutButton />
    </section>
  );
}