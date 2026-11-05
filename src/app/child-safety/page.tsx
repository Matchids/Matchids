import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Safety",
  description: "Matchids' family-first approach to privacy and child safety.",
  alternates: { canonical: "/child-safety" },
};

export default function ChildSafetyPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Trust & safety</p>
      <h1>Children&apos;s safety comes before engagement.</h1>
      <p className="content-lead">Matchids is designed for children and families. Public child profiles, child-to-child messaging, and targeted advertising are not part of this experience.</p>
      <div className="safety-list">
        <article><h2>Family-first accounts</h2><p>Accounts are intended to be created and managed by parents or guardians. The current sign-up flow does not create child accounts.</p></article>
        <article><h2>Reviewed public content</h2><p>Only artwork explicitly marked published is included in the public Kids Art catalog. Content submission and moderation tools still need operational setup.</p></article>
        <article><h2>Privacy and care</h2><p>Before launch, Matchids needs jurisdiction-specific privacy notices, retention rules, and a verified reporting channel reviewed by qualified counsel.</p></article>
      </div>
    </section>
  );
}