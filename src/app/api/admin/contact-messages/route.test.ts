import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/admin/contact-messages/route";
import { getCurrentUser } from "@/lib/auth/session";

vi.mock("@/lib/auth/session", () => ({ getCurrentUser: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({
  prisma: { contactMessage: { findMany: vi.fn(), count: vi.fn(), update: vi.fn() } },
}));

beforeEach(() => vi.clearAllMocks());

describe("GET /api/admin/contact-messages", () => {
  it("requires authentication", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);
    const response = await GET(new NextRequest("https://matchids.example/api/admin/contact-messages"));

    expect(response.status).toBe(401);
  });

  it("does not reveal contact messages to a parent account", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: "parent-1",
      email: "parent@example.com",
      displayName: "Parent",
      role: "PARENT",
      locale: "en",
    });
    const response = await GET(new NextRequest("https://matchids.example/api/admin/contact-messages"));

    expect(response.status).toBe(403);
  });
});