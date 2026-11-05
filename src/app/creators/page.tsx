import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Creators",
  description: "Current availability of Matchids creator submissions and publishing.",
  alternates: { canonical: "/creators" },
};

export default function CreatorsPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">For creators</p>
      <h1>Make room for stories and ideas.</h1>
      <p className="content-lead">Matchids intends to make space for children&apos;s books and creative learning resources from authors, illustrators, and educators.</p>
      <div className="empty-state" role="status">
        <h2>Creator submissions are not open</h2>
        <p>There is no creator application, content-upload process, publishing agreement, or earnings program in this app yet. Please do not send children&apos;s content through an unconfigured channel.</p>
      </div>
      <p className="contact-note">Learn about the current public catalog in <Link href="/help">Help</Link>.</p>
    </section>
  );
}