import type { Metadata } from "next";
import { BookBrowser } from "@/components/book-browser";
import { getPublishedBooks } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Books",
  description: "Browse children's books in the Matchids library.",
  alternates: { canonical: "/books" },
};

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getPublishedBooks();

  return (
    <section className="page-wrap catalog-page">
      <div className="section-heading">
        <p className="eyebrow">The library</p>
        <h1>Books for curious minds</h1>
        <p>Browse by age, language, or access type. Free and premium titles are clearly marked.</p>
      </div>
      {books.some((book) => book.isDemoContent) && (
        <p className="notice-banner" role="status">Sample content for local development. These are not published Matchids books.</p>
      )}
      <BookBrowser books={books} />
    </section>
  );
}