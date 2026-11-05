import { NextRequest, NextResponse } from "next/server";
import { ContactSubmissionSchema } from "@/lib/contact/validation";
import {
  ContactRateLimitError,
  getContactSourceHash,
  notifyContactSubmission,
  storeContactSubmission,
} from "@/lib/contact/submission";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 12_288;

function json(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    return Boolean(origin && new URL(origin).origin === new URL(request.url).origin);
  } catch {
    return false;
  }
}

async function readLimitedBody(request: NextRequest): Promise<{ body: string } | { tooLarge: true }> {
  const reader = request.body?.getReader();
  if (!reader) return { body: "" };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { body: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ error: "Request could not be verified." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "Invalid request format." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 12_288) {
    return json({ error: "Message is too large." }, 413);
  }

  let input: unknown;
  try {
    const body = await readLimitedBody(request);
    if ("tooLarge" in body) {
      return json({ error: "Message is too large." }, 413);
    }
    input = JSON.parse(body.body);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (typeof input === "object" && input !== null && "website" in input && input.website) {
    return json({ accepted: true, notificationSent: false }, 202);
  }

  const parsed = ContactSubmissionSchema.safeParse(input);
  if (!parsed.success) return json({ error: "Check the name, email, subject, and message fields." }, 400);

  const sourceHash = getContactSourceHash(request, parsed.data.email);
  if (!sourceHash) return json({ error: "The contact service is not configured." }, 503);

  try {
    const message = await storeContactSubmission(parsed.data, sourceHash);
    const notificationSent = await notifyContactSubmission(parsed.data, message.id);
    return json({ accepted: true, notificationSent }, 202);
  } catch (error) {
    if (error instanceof ContactRateLimitError) {
      return json({ error: "Too many messages were submitted. Please try again later." }, 429);
    }
    if (error instanceof Error && "code" in error && error.code === "P2034") {
      return json({ error: "Too many messages were submitted. Please try again later." }, 429);
    }
    return json({ error: "We couldn't save your message. Please try again or email Matchids directly." }, 503);
  }
}