import { describe, expect, it } from "vitest";
import { paginateItems } from "@/lib/catalog-pagination";

describe("catalog pagination", () => {
  it("returns the requested slice and page metadata", () => {
    const result = paginateItems([1, 2, 3, 4, 5], 2, 2);

    expect(result).toEqual({
      items: [3, 4],
      page: 2,
      pageSize: 2,
      totalItems: 5,
      totalPages: 3,
    });
  });

  it("clamps out-of-range and invalid page values", () => {
    expect(paginateItems(["a", "b", "c"], 10, 2).items).toEqual(["c"]);
    expect(paginateItems(["a", "b", "c"], 0, 2).page).toBe(1);
    expect(paginateItems(["a", "b"], 1, 0).pageSize).toBe(1);
  });

  it("handles an empty catalog without producing an invalid page", () => {
    expect(paginateItems([], 4, 12)).toEqual({
      items: [],
      page: 1,
      pageSize: 12,
      totalItems: 0,
      totalPages: 0,
    });
  });
});