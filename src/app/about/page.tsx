import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Matchids",
  description: "Learn about Matchids, founded by Suzie Matchilda George.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">About Matchids</p>
      <h1>Learning, imagination, and care belong together.</h1>
      <p className="content-lead">Matchids is an international digital platform for children, parents, and communities, bringing books, creative activities, and social impact into one family-focused experience.</p>
      <div className="founder-note">
        <h2>Founded by Suzie Matchilda George</h2>
        <p>Matchids began with a belief that every child deserves stories, creativity, and care, and every family deserves a platform they can trust.</p>
      </div>
    </section>
  );
}