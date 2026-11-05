import { describe, expect, it } from "vitest";
import { scoreActivity } from "@/lib/activity-scoring";

const questions = [
  { id: "first", correctOptionId: "a" },
  { id: "second", correctOptionId: "c" },
];

describe("activity scoring", () => {
  it("scores correct answers without counting unanswered questions", () => {
    expect(scoreActivity(questions, { first: "a", second: "b" })).toEqual({ correct: 1, total: 2 });
  });

  it("returns zero for no answers and a perfect score for all correct answers", () => {
    expect(scoreActivity(questions, {})).toEqual({ correct: 0, total: 2 });
    expect(scoreActivity(questions, { first: "a", second: "c" })).toEqual({ correct: 2, total: 2 });
  });
});