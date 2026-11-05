import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedBooks } from "@/lib/catalog";
import { BookCard } from "@/components/book-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const pathways = [
  {
    number: "01",
    title: "Learn through stories",
    text: "Explore books by reading age, language, and access type. Only titles published in Matchids appear in the library.",
    href: "/books",
    action: "Explore the library",
    tone: "pathway-green",
  },
  {
    number: "02",
    title: "Imagine freely",
    text: "Discover creative activities and artwork shared in a thoughtful, family-friendly space.",
    href: "/kids-art",
    action: "Discover Kids Art",
    tone: "pathway-yellow",
  },
  {
    number: "03",
    title: "Create with care",
    text: "Children's work should stay private until it has been reviewed and approved for publication.",
    href: "/child-safety",
    action: "Our approach to sharing",
    tone: "pathway-ink",
  },
  {
    number: "04",
    title: "Give with care",
    text: "Explore Matchids' giving mission. Campaigns and reports appear only when they are verified and published.",
    href: "/give-back",
    action: "Our giving principles",
    tone: "pathway-coral",
  },
];

export default async function HomePage() {
  const featuredBooks = (await getPublishedBooks()).slice(0, 3);

  return (
    <>
      <section className="home-hero">
        <div className="page-wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">A world made for growing minds</p>
            <h1>Room to wonder.<br />Stories to share.</h1>
            <p className="hero-description">
              Matchids brings books, creative activities, and a spirit of giving together for children and the grown-ups who care for them.
            </p>
            <div className="hero-actions">
              <Link className="button button-ink" href="/books">Explore books</Link>
              <Link className="text-action" href="/kids-art">Discover Kids Art <span aria-hidden="true">→</span></Link>
            </div>
            <p className="hero-note">A family-first space, built with care and growing one step at a time.</p>
          </div>
          <div className="hero-art">
            <Image
              className="hero-logo"
              src="/logo/matchids-logo.png"
              alt="The official Matchids logo: two figures, an open book, and the Matchids wordmark"
              width={1254}
              height={1254}
              priority
            />
          </div>
        </div>
      </section>

      <section className="intro-section page-wrap">
        <div className="intro-aside"><span>About Matchids</span><span className="aside-rule" /></div>
        <div className="intro-copy">
          <h2>Every child deserves a place to explore what they love.</h2>
          <p>Matchids is an international children&apos;s learning and creativity platform founded by Suzie Matchilda George. We bring stories, hands-on imagination, and community care into one welcoming experience for families.</p>
          <Link className="text-action" href="/about">Meet Matchids <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="pathways-section">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="eyebrow">Explore at your own pace</p>
            <h2>Learn. Imagine. Create. Give.</h2>
          </div>
          <div className="pathways-grid">
            {pathways.map((item) => (
              <article className={`pathway ${item.tone}`} key={item.number}>
                <span className="pathway-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="pathway-link" href={item.href}>{item.action} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section page-wrap catalog-page">
        <div className="section-heading">
          <p className="eyebrow">From the library</p>
          <h2>A story to start with</h2>
          <p>Explore books by age, language, and access type.</p>
        </div>
        {featuredBooks.length ? (
          <div className="book-grid">
            {featuredBooks.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Our shelves are growing</h2>
            <p>Published books will be featured here as they become available.</p>
            <Link className="text-action" href="/books">Visit the library <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>

      <section className="family-section page-wrap">
        <div className="family-copy">
          <p className="eyebrow">For the whole family</p>
          <h2>Curiosity for children. Confidence for parents.</h2>
          <p>We believe a good children&apos;s platform should feel joyful without losing sight of privacy, age-appropriate content, and the role of parents and guardians.</p>
          <Link className="text-action" href="/child-safety">How we think about safety <span aria-hidden="true">→</span></Link>
        </div>
        <div className="family-note">
          <span className="note-mark" aria-hidden="true">“</span>
          <p>More wonder, less noise.</p>
          <span>Our guiding idea</span>
        </div>
      </section>

      <section className="give-strip">
        <div className="page-wrap give-strip-inner">
          <div>
            <p className="eyebrow">Give Back</p>
            <h2>Learning can reach beyond the page.</h2>
            <p>Our social-impact work is being built transparently. We share programs and outcomes only when they are verified.</p>
          </div>
          <Link className="button button-outline" href="/give-back">How giving works</Link>
        </div>
      </section>
    </>
  );
}