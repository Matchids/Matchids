import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { hashPassword, issueSessionToken, verifyPassword, verifySessionToken } from "@/lib/auth/session";
import { passwordSchema } from "@/lib/auth/validation";

const testSecret = "matchids-auth-test-secret-with-at-least-32-characters";
let previousSecret: string | undefined;

beforeEach(() => {
  previousSecret = process.env.AUTH_SECRET;
  process.env.AUTH_SECRET = testSecret;
});

afterEach(() => {
  if (previousSecret === undefined) delete process.env.AUTH_SECRET;
  else process.env.AUTH_SECRET = previousSecret;
});

describe("account security primitives", () => {
  it("round-trips a signed session payload", () => {
    const token = issueSessionToken({ userId: "parent-1", role: "PARENT" });
    expect(verifySessionToken(token)).toEqual({ userId: "parent-1", role: "PARENT" });
  });

  it("rejects malformed or tampered session tokens", () => {
    const token = issueSessionToken({ userId: "parent-1", role: "PARENT" });
    expect(verifySessionToken("not-a-token")).toBeNull();
    expect(verifySessionToken(`${token}tampered`)).toBeNull();
  });

  it("stores a bcrypt hash and verifies only the matching password", async () => {
    const hash = await hashPassword("correct horse battery staple");
    expect(hash).not.toBe("correct horse battery staple");
    await expect(verifyPassword("correct horse battery staple", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong password", hash)).resolves.toBe(false);
  });

  it("rejects passwords that exceed bcrypt's UTF-8 byte limit", () => {
    expect(passwordSchema.safeParse("é".repeat(37)).success).toBe(false);
    expect(passwordSchema.safeParse("é".repeat(36)).success).toBe(true);
  });
});