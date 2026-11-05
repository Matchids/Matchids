import { ContactMessageStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

const UpdateSchema = z.object({
  isRead: z.boolean().optional(),
  status: z.nativeEnum(ContactMessageStatus).optional(),
  replyReference: z.string().trim().max(500).nullable().optional()
    .refine((value) => value == null || !/[\u0000-\u001f\u007f]/.test(value)),
}).refine((value) => Object.keys(value).length > 0);

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

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return json({ error: "Request could not be verified." }, 403);
  const user = await getCurrentUser();
  if (!user) return json({ error: "Authentication required." }, 401);
  if (user.role !== "ADMIN") return json({ error: "Administrator access required." }, 403);

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const parsed = UpdateSchema.safeParse(input);
  if (!parsed.success) return json({ error: "Invalid contact message update." }, 400);

  const { id } = await context.params;
  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...parsed.data,
        ...(parsed.data.status === "REPLIED" ? { repliedAt: new Date() } : {}),
      },
      select: {
        id: true,
        isRead: true,
        status: true,
        replyReference: true,
        repliedAt: true,
      },
    });
    return json({ message });
  } catch {
    return json({ error: "Contact message could not be updated." }, 404);
  }
}