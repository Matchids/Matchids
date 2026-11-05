import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust and Safety",
  description: "See the safety controls present in Matchids and the protections still being built.",
  alternates: { canonical: "/trust" },
};

export default function TrustPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Trust and safety</p>
      <h1>Safety is part of the product, not a promise on its own.</h1>
      <p className="content-lead">Here is what the available code currently does and what still needs to be built before families should rely on Matchids as a complete child-facing service.</p>
      <div className="safety-list">
        <article><h2>Present in the app</h2><p>Parent-only signup, password hashing, httpOnly session cookies, server-side role checks, and public artwork filtering for published content. Public child profiles and messaging are not offered.</p></article>
        <article><h2>Still required</h2><p>Separate parent-managed child profiles, distributed rate limiting, email verification and recovery, audited moderation tools, deletion workflows, and a reviewed incident-response process.</p></article>
        <article><h2>Independent review</h2><p>The current privacy and terms pages are prelaunch drafts. No certification or legal compliance claim is made; qualified privacy and child-safety review is required.</p><Link className="text-action" href="/child-safety">Read child-safety information <span aria-hidden="true">→</span></Link></article>
      </div>
    </section>
  );
}