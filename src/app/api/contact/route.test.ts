import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import {
  ContactRateLimitError,
  getContactSourceHash,
  notifyContactSubmission,
  storeContactSubmission,
} from "@/lib/contact/submission";

vi.mock("@/lib/contact/submission", () => ({
  ContactRateLimitError: class ContactRateLimitError extends Error {},
  getContactSourceHash: vi.fn(),
  notifyContactSubmission: vi.fn(),
  storeContactSubmission: vi.fn(),
}));

const validSubmission = {
  name: "Parent Example",
  email: "PARENT@example.com",
  subject: "Question about books",
  message: "Could you tell me when the library will open?",
};

function makeRequest(body: unknown, origin = "https://matchids.example") {
  return new NextRequest("https://matchids.example/api/contact", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getContactSourceHash).mockReturnValue("test-source-hash");
  vi.mocked(storeContactSubmission).mockResolvedValue({ id: "message-1" });
  vi.mocked(notifyContactSubmission).mockResolvedValue(true);
});

describe("POST /api/contact", () => {
  it("rejects requests from a different origin", async () => {
    const response = await POST(makeRequest(validSubmission, "https://outside.example"));

    expect(response.status).toBe(403);
    expect(storeContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects malformed or invalid submissions", async () => {
    const response = await POST(makeRequest({ ...validSubmission, email: "not-an-email" }));

    expect(response.status).toBe(400);
    expect(storeContactSubmission).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies even when Content-Length is absent", async () => {
    const response = await POST(makeRequest({ ...validSubmission, message: "x".repeat(13_000) }));

    expect(response.status).toBe(413);
    expect(storeContactSubmission).not.toHaveBeenCalled();
  });

  it("silently accepts the honeypot without saving or notifying", async () => {
    const response = await POST(makeRequest({ ...validSubmission, website: "bot link" }));

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ accepted: true, notificationSent: false });
    expect(storeContactSubmission).not.toHaveBeenCalled();
    expect(notifyContactSubmission).not.toHaveBeenCalled();
  });

  it("saves validated input before returning the notification result", async () => {
    const response = await POST(makeRequest(validSubmission));

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ accepted: true, notificationSent: true });
    expect(storeContactSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ email: "parent@example.com" }),
      "test-source-hash"
    );
    expect(notifyContactSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ email: "parent@example.com" }),
      "message-1"
    );
  });

  it("returns rate-limit and sanitized storage errors", async () => {
    vi.mocked(storeContactSubmission).mockRejectedValueOnce(new ContactRateLimitError());
    const limited = await POST(makeRequest(validSubmission));
    expect(limited.status).toBe(429);

    vi.mocked(storeContactSubmission).mockRejectedValueOnce(new Error("private database details"));
    const failed = await POST(makeRequest(validSubmission));
    expect(failed.status).toBe(503);
    expect(await failed.text()).not.toContain("private database details");
  });
});