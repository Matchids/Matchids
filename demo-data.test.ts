import { describe, it, expect } from "vitest";
import { demoBooks } from "@/data/demo-books";

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
});
