import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Schools",
  description: "Current availability of Matchids school and classroom features.",
  alternates: { canonical: "/schools" },
};

export default function SchoolsPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">For schools and educators</p>
      <h1>Learning resources should work for classrooms, too.</h1>
      <p className="content-lead">Matchids is exploring ways to support reading and creativity in learning communities, while protecting children&apos;s privacy.</p>
      <div className="empty-state" role="status">
        <h2>School access is not available yet</h2>
        <p>Classrooms, teacher accounts, school subscriptions, and educator dashboards are not currently offered. No school partners or enrollment programs are represented here.</p>
      </div>
      <p className="contact-note">For current platform information, visit <Link href="/help">Help</Link>.</p>
    </section>
  );
}