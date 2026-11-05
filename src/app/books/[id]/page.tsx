import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBooks } from "@/lib/catalog";

interface BookPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = (await getPublishedBooks()).find((item) => item.id === params.id);
  return {
    title: book ? book.title : "Book not found",
    description: book?.description,
    alternates: { canonical: `/books/${params.id}` },
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const book = (await getPublishedBooks()).find((item) => item.id === params.id);
  if (!book) notFound();

  return (
    <section className="page-wrap detail-page">
      <Link className="back-link" href="/books">← All books</Link>
      <div className="book-detail">
        <div className="detail-cover">
          {book.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.coverImageUrl} alt={`Cover of ${book.title}`} />
          ) : <span>Cover not supplied</span>}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{book.category}</p>
          {book.isDemoContent && <p className="demo-label">Sample catalog content</p>}
          <h1>{book.title}</h1>
          <p className="detail-byline">By {book.author} · Ages {book.ageRange[0]}–{book.ageRange[1]} · {book.language.toUpperCase()}</p>
          <p className="detail-description">{book.description}</p>
          <dl className="book-facts">
            <div><dt>Access</dt><dd>{book.accessType === "FREE" ? "Free" : "Premium"}</dd></div>
            <div><dt>Availability</dt><dd>Reading file not provided</dd></div>
          </dl>
          <p className="availability-note">
            {book.isDemoContent
              ? "This sample record has no reading file and cannot be purchased."
              : "Online reading and checkout will be available when verified book files and payment services are connected."}
          </p>
        </div>
      </div>
    </section>
  );
}