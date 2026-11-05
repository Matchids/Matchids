import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { Prisma } from "@prisma/client";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { sendContactNotification } from "@/lib/contact/email";
import type { ContactSubmission } from "@/lib/contact/validation";

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;

export class ContactRateLimitError extends Error {
  constructor() {
    super("Contact rate limit reached.");
    this.name = "ContactRateLimitError";
  }
}

export function getContactSourceHash(request: NextRequest, email: string) {
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET;
  if (!secret || secret.length < 32) return null;

  let source = `email:${email.toLowerCase()}`;
  const trustedHeader = process.env.CONTACT_TRUSTED_IP_HEADER?.toLowerCase();
  if (trustedHeader) {
    if (trustedHeader !== "x-real-ip" && trustedHeader !== "x-forwarded-for") return null;
    const headerValue = request.headers.get(trustedHeader);
    const candidate = trustedHeader === "x-forwarded-for"
      ? headerValue?.split(",", 1)[0]?.trim()
      : headerValue?.trim();
    if (!candidate || !isIP(candidate)) return null;
    source = `ip:${candidate}`;
  }

  return createHmac("sha256", secret).update(source).digest("hex");
}

export async function storeContactSubmission(submission: ContactSubmission, sourceHash: string) {
  return prisma.$transaction(async (transaction) => {
    const recentSubmissions = await transaction.contactMessage.count({
      where: {
        sourceHash,
        createdAt: { gte: new Date(Date.now() - RATE_WINDOW_MS) },
      },
    });
    if (recentSubmissions >= RATE_LIMIT) throw new ContactRateLimitError();

    return transaction.contactMessage.create({
      data: {
        name: submission.name,
        senderEmail: submission.email,
        subject: submission.subject,
        message: submission.message,
        sourceHash,
      },
      select: { id: true },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}

export async function notifyContactSubmission(submission: ContactSubmission, messageId: string) {
  try {
    const sent = await sendContactNotification(submission, messageId);
    if (!sent) return false;

    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { notificationStatus: "SENT" },
    });
    return true;
  } catch {
    try {
      await prisma.contactMessage.update({
        where: { id: messageId },
        data: { notificationStatus: "FAILED" },
      });
    } catch {
      // Keep provider and database errors out of the public response.
    }
    return false;
  }
}