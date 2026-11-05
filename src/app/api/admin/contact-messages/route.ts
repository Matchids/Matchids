import { NextRequest, NextResponse } from "next/server";
import { ContactMessageStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function json(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return json({ error: "Authentication required." }, 401);
  if (user.role !== "ADMIN") return json({ error: "Administrator access required." }, 403);

  const params = request.nextUrl.searchParams;
  const query = (params.get("q") ?? "").trim().slice(0, 100);
  const status = params.get("status");
  const read = params.get("read");
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);
  const pageSize = 25;

  if (status && !Object.values(ContactMessageStatus).includes(status as ContactMessageStatus)) {
    return json({ error: "Invalid status filter." }, 400);
  }
  if (read && read !== "true" && read !== "false") return json({ error: "Invalid read filter." }, 400);

  const where = {
    ...(status ? { status: status as ContactMessageStatus } : {}),
    ...(read ? { isRead: read === "true" } : {}),
    ...(query ? {
      OR: [
        { name: { contains: query, mode: "insensitive" as const } },
        { senderEmail: { contains: query, mode: "insensitive" as const } },
        { subject: { contains: query, mode: "insensitive" as const } },
        { message: { contains: query, mode: "insensitive" as const } },
      ],
    } : {}),
  };

  try {
    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          senderEmail: true,
          subject: true,
          message: true,
          isRead: true,
          status: true,
          notificationStatus: true,
          replyReference: true,
          repliedAt: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.count({ where }),
    ]);
    return json({ messages, page, pageSize, total });
  } catch {
    return json({ error: "Contact messages are temporarily unavailable." }, 503);
  }
}