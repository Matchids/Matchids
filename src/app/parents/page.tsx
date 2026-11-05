import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Parents",
  description: "Learn about Matchids' family-first approach and current parent account availability.",
  alternates: { canonical: "/parents" },
};

export default function ParentsPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">For parents and guardians</p>
      <h1>A thoughtful place to explore together.</h1>
      <p className="content-lead">Matchids is designed around families: parents guide access, published content is reviewed, and children&apos;s personal details should stay private.</p>
      <div className="safety-list">
        <article>
          <h2>What parents can use today</h2>
          <p>Browse the public book catalog and published Kids Art without creating a child profile. Sample books, when present in development, are labeled as samples.</p>
          <Link className="text-action" href="/books">Browse books <span aria-hidden="true">→</span></Link>
        </article>
        <article>
          <h2>What is not active yet</h2>
          <p>Parent-managed child profiles, reading progress, rewards, notifications, and parental settings are not implemented. Account access also requires a configured database and auth secret.</p>
          <Link className="text-action" href="/child-safety">Read child-safety information <span aria-hidden="true">→</span></Link>
        </article>
      </div>
    </section>
  );
}