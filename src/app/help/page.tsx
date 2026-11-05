import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find current information about Matchids books, activities, accounts, safety, and payments.",
  alternates: { canonical: "/help" },
};

const helpTopics = [
  { title: "Books and reading", text: "Browse published titles and the current search filters.", href: "/books", action: "Open Books" },
  { title: "Activities", text: "Try the reading activity. Answers are not saved to an account.", href: "/activities", action: "Open Activities" },
  { title: "Accounts and families", text: "Account access depends on a configured application server, database, and auth secret.", href: "/parents", action: "Parent information" },
  { title: "Safety and privacy", text: "See the current family-first principles and known limitations.", href: "/child-safety", action: "Child safety" },
  { title: "Payments and giving", text: "Card, CeloHT, and online donations are not operational; checkout does not take payment.", href: "/give-back", action: "Give Back status" },
];

export default function HelpPage() {
  return (
    <section className="page-wrap content-page">
      <p className="eyebrow">Help center</p>
      <h1>Clear answers for families.</h1>
      <p className="content-lead">Find out what Matchids can do today and which services are still being prepared.</p>
      <div className="safety-list">
        {helpTopics.map((topic) => (
          <article key={topic.href}>
            <h2>{topic.title}</h2>
            <p>{topic.text}</p>
            <Link className="text-action" href={topic.href}>{topic.action} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      <p className="contact-note">More answers are available in <Link href="/faq">Frequently asked questions</Link>. Secure message delivery is not configured on Contact.</p>
    </section>
  );
}