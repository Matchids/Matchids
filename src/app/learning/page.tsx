import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning",
  description: "Explore Matchids books and a short reading activity for curious minds.",
  alternates: { canonical: "/learning" },
};

export default function LearningPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Learn</p>
      <h1>Small discoveries can open big worlds.</h1>
      <p className="content-lead">Start with a story, notice its details, and follow a question wherever it leads. Matchids is building a family-first place for reading and creative learning.</p>
      <div className="safety-list learning-options">
        <article>
          <p className="eyebrow">Read</p>
          <h2>Find a story</h2>
          <p>Browse published Matchids books by age, language, category, and access type. The library only shows titles available in the catalog.</p>
          <Link className="text-action" href="/books">Browse books <span aria-hidden="true">→</span></Link>
        </article>
        <article>
          <p className="eyebrow">Explore</p>
          <h2>Try a reading activity</h2>
          <p>Read an original short passage and answer questions about what happened. Answers are not saved or linked to a child profile.</p>
          <Link className="text-action" href="/activities">Start an activity <span aria-hidden="true">→</span></Link>
        </article>
      </div>
      <p className="notice-banner" role="status">Reading progress, rewards, and personalized learning plans are not available yet. Matchids does not record activity answers.</p>
    </section>
  );
}