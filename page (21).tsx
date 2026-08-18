import { Section } from "@/components/home/Section";
import { BookCard } from "@/components/books/BookCard";
import { demoBooks } from "@/data/demo-books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description: "Browse Matchids' library of free and premium books for children.",
};

export default function BooksPage() {
  return (
    <Section
      eyebrow="Library"
      title="All books"
      description="Browse the full Matchids library. Filter by age, category and language as the catalog grows."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoBooks.map((book) => (
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
    </Section>
  );
}
