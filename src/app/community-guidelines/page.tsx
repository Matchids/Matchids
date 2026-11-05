import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description: "Matchids community principles and current content-submission limitations.",
  alternates: { canonical: "/community-guidelines" },
};

export default function CommunityGuidelinesPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Community guidelines</p>
      <h1>A kind, careful place to learn.</h1>
      <p className="content-lead">Matchids is being built for children and families. Respect, privacy, age-appropriate material, and adult oversight should guide every future contribution.</p>
      <div className="safety-list">
        <article><h2>Protect children&apos;s privacy</h2><p>Do not publish a child&apos;s full name, contact details, school, location, or other identifying information in artwork or descriptions.</p></article>
        <article><h2>Review before sharing</h2><p>Children&apos;s artwork and creator submissions must be reviewed before publication. User submissions are not enabled in the current app.</p></article>
        <article><h2>No open social features</h2><p>Public child profiles, comments, and direct messaging are not part of the current platform.</p></article>
      </div>
      <p className="notice-banner" role="note">These product principles are not a substitute for published, jurisdiction-specific legal policies. Formal community enforcement and reporting tools are not yet available.</p>
    </section>
  );
}