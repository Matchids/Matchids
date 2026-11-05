import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/sign-in?next=%2Fadmin");
  if (user.role !== "ADMIN") notFound();

  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Administration</p>
      <h1>Matchids admin</h1>
      <div className="notice-banner" role="status">
        Admin access is restricted to database accounts with the ADMIN role. Content editing and moderation actions are not enabled in this deployment.
      </div>
    </section>
  );
}