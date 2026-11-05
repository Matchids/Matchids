import { afterEach, describe, it, expect } from "vitest";
import { demoBooks } from "@/data/demo-books";
import { getPublishedBooks } from "@/lib/catalog";

const originalDatabaseUrl = process.env.DATABASE_URL;

afterEach(() => {
  if (originalDatabaseUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDatabaseUrl;
});

describe("demo book data", () => {
  it("marks every entry as demo content", () => {
    for (const book of demoBooks) {
      expect(book.isDemoContent).toBe(true);
    }
  });

  it("gives every premium book a positive price and every free book a zero price", () => {
    for (const book of demoBooks) {
      if (book.accessType === "PREMIUM") {
        expect(book.priceCents).toBeGreaterThan(0);
      } else {
        expect(book.priceCents).toBe(0);
      }
    }
  });

  it("returns clearly marked local sample books when no database is configured", async () => {
    delete process.env.DATABASE_URL;
    const books = await getPublishedBooks();
    expect(books.length).toBeGreaterThan(0);
    expect(books.every((book) => book.isDemoContent)).toBe(true);
  });
});
