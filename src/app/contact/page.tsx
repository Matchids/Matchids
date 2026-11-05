import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Matchids with questions about the platform.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Contact</p>
      <h1>We would like to hear from you.</h1>
      <p className="content-lead">The repository does not include a verified contact inbox or message-delivery service yet. No online contact form is shown until messages can be securely delivered and handled.</p>
      <div className="empty-state">
        <h2>Contact service not configured</h2>
        <p>Set up and verify the Matchids support address and transactional email provider before publishing a contact channel.</p>
      </div>
    </section>
  );
}