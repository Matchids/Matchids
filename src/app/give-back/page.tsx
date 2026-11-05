import type { Metadata } from "next";
import Link from "next/link";
import { getGiveBackContent } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Give Back",
  description: "Learn about Matchids' social-impact mission and transparent giving approach.",
  alternates: { canonical: "/give-back" },
};

export const dynamic = "force-dynamic";

function safeExternalUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default async function GiveBackPage() {
  const content = await getGiveBackContent();

  return (
    <>
      <section className="mission-hero">
        <div className="page-wrap">
          <p className="eyebrow">Give Back</p>
          <h1>Care should travel further.</h1>
          <p>Matchids is building a giving program to support children who need access to learning and creative opportunities. Programs and outcomes are shared only when verified.</p>
        </div>
      </section>
      <section className="page-wrap transparency-section">
        <div className="section-heading">
          <p className="eyebrow">A transparent start</p>
          <h2>Every claim backed by a record</h2>
          <p>Campaigns, organizations, and reports are shown only when published from Matchids&apos; verified records.</p>
        </div>
        <div className="transparency-grid">
          <article>
            <span>01</span><h3>Active campaigns</h3>
            {content.campaigns.length ? content.campaigns.map((campaign) => (
              <p key={campaign.id}><strong>{campaign.title}</strong><br />{campaign.description}</p>
            )) : <p>No public campaign is active right now.</p>}
          </article>
          <article>
            <span>02</span><h3>Verified organizations</h3>
            {content.organizations.length ? content.organizations.map((organization) => {
              const website = safeExternalUrl(organization.website);
              return (
                <p key={organization.id}>
                  <strong>{organization.name}</strong><br />{organization.description}
                  {website && <> <a href={website} rel="noopener noreferrer">Visit website</a></>}
                </p>
              );
            }) : <p>No organization has been verified for public listing yet.</p>}
          </article>
          <article>
            <span>03</span><h3>Published reports</h3>
            {content.reports.length ? content.reports.map((report) => (
              <p key={report.id}>
                <strong>{new Date(report.periodStart).toLocaleDateString()}–{new Date(report.periodEnd).toLocaleDateString()}</strong><br />
                {report.summary}
              </p>
            )) : <p>Reports will appear here after they are prepared from verified records and published.</p>}
          </article>
        </div>
        <p className="notice-banner" role="status">Online contributions are not accepted yet. Payments remain unavailable until a provider and server-side verification flow are operational.</p>
        <p className="contact-note">Questions about the mission? Visit <Link href="/contact">Contact</Link>.</p>
      </section>
    </>
  );
}