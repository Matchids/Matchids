import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Section } from "@/components/home/Section";
import { BookCard } from "@/components/books/BookCard";
import { demoBooks } from "@/data/demo-books";

export default function HomePage() {
  const featuredBooks = demoBooks.slice(0, 3);

  return (
    <>
      <Hero />

      <Section
        eyebrow="Our mission"
        title="A safe, joyful place for children to grow"
        description="Matchids brings reading, imagination and creativity together in one place — built with parents' trust and children's curiosity in mind. We're an early-stage platform, growing our library and programs step by step, in the open."
      />

      <Section
        eyebrow="Books"
        title="Stories to read, right now"
        description="A growing library of free and premium books, organized by age and category."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
              author={book.author}
              ageRange={book.ageRange}
              accessType={book.accessType}
              priceCents={book.priceCents}
            />
          ))}
        </div>
        <div className="mt-8 flex gap-4">
          <Link href="/books/free" className="text-sm font-semibold text-violet hover:underline">
            Browse free books →
          </Link>
          <Link href="/books/premium" className="text-sm font-semibold text-violet hover:underline">
            Browse premium books →
          </Link>
        </div>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Kids Art"
        title="A place to color, imagine and create"
        description="Coloring pages, creative activities and gentle prompts across categories like Animals, Nature, Fantasy and more."
      >
        <Link
          href="/kids-art"
          className="inline-block rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-dark"
        >
          Explore Kids Art
        </Link>
      </Section>

      <Section
        eyebrow="Give Back"
        title="Reading that reaches further"
        description="A part of what Matchids builds goes toward supporting children in orphanages who need it most. Our donation programs, partner organizations and impact reporting are being built openly, one verified step at a time — we don't publish numbers or partners until they're real."
      >
        <Link
          href="/give-back"
          className="inline-block rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-dark"
        >
          Learn about Give Back
        </Link>
      </Section>

      <Section
        className="bg-white"
        eyebrow="Payments"
        title="Built for how families pay, everywhere"
        description="Matchids is designed to support multiple international payment methods, including debit and credit cards through a payment processor, and CeloHT — a dapp for sending and receiving CELO and USDm on the Celo blockchain — for families who prefer Web3 payments. Methods go live as each integration is completed and verified."
      />

      <Section
        eyebrow="Founder"
        title="From the founder"
        description={undefined}
      >
        <blockquote className="max-w-2xl border-l-4 border-gold pl-5 text-lg text-ink/80">
          Matchids started from a simple belief: every child deserves stories,
          creativity and care — and every family deserves a platform they can
          trust.
        </blockquote>
        <p className="mt-3 text-sm font-semibold text-ink/50">
          Suzie Matchilda George, Founder of Matchids
        </p>
      </Section>
    </>
  );
}
