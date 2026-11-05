import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Prelaunch privacy information for Matchids accounts and content.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Privacy</p>
      <h1>Privacy matters, especially for families.</h1>
      <div className="notice-banner" role="note">Prelaunch draft. This page is not a legally reviewed privacy notice and must be completed for each launch jurisdiction.</div>
      <div className="legal-copy">
        <h2>Current account data</h2>
        <p>The current account flow is for a parent or guardian and stores a display name, email address, password hash, and account role in the configured database. Passwords are not stored in plain text.</p>
        <h2>Children and public content</h2>
        <p>The current signup flow does not create child accounts or public child profiles. The site has no child-to-child messaging or targeted advertising features.</p>
        <h2>Services and retention</h2>
        <p>Database hosting, email, payments, and file storage must be identified in the final notice before production. Retention, deletion, regional rights, and parent-request processes have not yet been configured.</p>
      </div>
    </section>
  );
}