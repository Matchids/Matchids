import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Terms</p>
      <h1>Terms for using Matchids</h1>
      <div className="notice-banner" role="note">Prelaunch draft. These terms require review by qualified counsel before Matchids is offered to the public.</div>
      <div className="legal-copy">
        <h2>Current availability</h2>
        <p>Matchids is still being prepared. Online purchases, donations, contact submissions, and file uploads are not currently available. Sample catalog entries are labeled and are not real published books.</p>
        <h2>Family accounts</h2>
        <p>Account registration is intended for adults acting as parents or guardians. Do not submit a child&apos;s personal information through the current account form.</p>
        <h2>Future service terms</h2>
        <p>Payment, refund, intellectual-property, content moderation, and jurisdiction-specific provisions must be completed before those services become available.</p>
      </div>
    </section>
  );
}