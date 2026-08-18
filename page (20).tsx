import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { demoBooks } from "@/data/demo-books";

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const book = demoBooks.find((b) => b.id === params.id);
  return {
    title: book ? book.title : "Book not found",
    description: book?.description,
  };
}

export default function BookDetailPage({ params }: Props) {
  const book = demoBooks.find((b) => b.id === params.id);
  if (!book) return notFound();

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.4fr]">
        <div
          className="flex h-72 items-center justify-center rounded-blob bg-gradient-to-br from-teal/20 via-gold/20 to-coral/20 text-6xl"
          aria-hidden="true"
        >
          📖
        </div>

        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              book.accessType === "FREE" ? "bg-teal/15 text-teal-dark" : "bg-gold/20 text-gold-dark"
            }`}
          >
            {book.accessType === "FREE" ? "Free" : "Premium"}
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">{book.title}</h1>
          <p className="mt-1 text-ink/60">
            by {book.author} · Ages {book.ageRange[0]}–{book.ageRange[1]}
          </p>
          <p className="mt-5 max-w-xl text-ink/80">{book.description}</p>

          <div className="mt-8">
            {book.accessType === "FREE" ? (
              <button className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink/90">
                Read for free
              </button>
            ) : (
              <Link
                href={`/checkout?book=${book.id}`}
                className="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-dark"
              >
                Buy for{" "}
                {(book.priceCents / 100).toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return demoBooks.map((book) => ({ id: book.id }));
}
