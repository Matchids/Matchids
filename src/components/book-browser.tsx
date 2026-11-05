"use client";

import { useState } from "react";
import { BookCard } from "@/components/book-card";
import type { CatalogBook } from "@/lib/catalog";

export function BookBrowser({ books }: { books: CatalogBook[] }) {
  const [query, setQuery] = useState("");
  const [access, setAccess] = useState("all");
  const [language, setLanguage] = useState("all");
  const [age, setAge] = useState("all");
  const [category, setCategory] = useState("all");
  const categories = [...new Set(books.map((book) => book.category))].sort();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchesQuery = !normalizedQuery ||
      `${book.title} ${book.author} ${book.description}`.toLowerCase().includes(normalizedQuery);
    const matchesAccess = access === "all" || book.accessType === access;
    const matchesLanguage = language === "all" || book.language === language;
    const matchesAge = age === "all" ||
      (age === "younger" ? book.ageRange[0] <= 6 : book.ageRange[1] >= 7);
    const matchesCategory = category === "all" || book.category === category;
    return matchesQuery && matchesAccess && matchesLanguage && matchesAge && matchesCategory;
  });

  return (
    <>
      <div className="catalog-controls" role="search">
        <label className="search-control">
          <span>Search books</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, or topic" />
        </label>
        <label>
          <span>Access</span>
          <select value={access} onChange={(event) => setAccess(event.target.value)}>
            <option value="all">All books</option>
            <option value="FREE">Free</option>
            <option value="PREMIUM">Premium</option>
          </select>
        </label>
        <label>
          <span>Age</span>
          <select value={age} onChange={(event) => setAge(event.target.value)}>
            <option value="all">All ages</option>
            <option value="younger">Up to 6</option>
            <option value="older">7 and up</option>
          </select>
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Language</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="all">All languages</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ht">Haitian Creole</option>
          </select>
        </label>
      </div>

      {filteredBooks.length ? (
        <div className="book-grid">
          {filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{books.length ? "No books match those filters" : "The shelves are being prepared"}</h2>
          <p>{books.length ? "Try a different search or filter." : "Published books will appear here when the catalog is connected."}</p>
        </div>
      )}
    </>
  );
}