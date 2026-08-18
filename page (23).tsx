import { Section } from "@/components/home/Section";
import { BookCard } from "@/components/books/BookCard";
import { demoBooks } from "@/data/demo-books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Books",
  description: "Free children's books available on Matchids.",
};

export default function FreeBooksPage() {
  const books = demoBooks.filter((b) => b.accessType === "FREE");
  return (
    <Section eyebrow="Library" title="Free books" description="Free to read, no account required to preview.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} id={book.id} title={book.title} description={book.description} author={book.author} ageRange={book.ageRange} accessType={book.accessType} priceCents={book.priceCents} />
        ))}
      </div>
    </Section>
  );
}
