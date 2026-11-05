import Link from "next/link";
import type { CatalogBook } from "@/lib/catalog";

export function BookCard({ book }: { book: CatalogBook }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.coverImageUrl} alt={`Cover of ${book.title}`} loading="lazy" />
        ) : <span>Cover not supplied</span>}
      </div>
      <div className="book-card-content">
        <div className="book-card-meta">
          <span className={book.accessType === "FREE" ? "access-free" : "access-premium"}>
            {book.accessType === "FREE" ? "Free" : "Premium"}
          </span>
          <span>Ages {book.ageRange[0]}–{book.ageRange[1]}</span>
        </div>
        {book.isDemoContent && <span className="demo-label">Sample catalog content</span>}
        <h2><Link href={`/books/${book.id}`}>{book.title}</Link></h2>
        <p className="book-description">{book.description}</p>
        <p className="book-byline">{book.author} · {book.language.toUpperCase()}</p>
      </div>
    </article>
  );
}