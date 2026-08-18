import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

/**
 * GET /api/books?category=&access=&language=&q=
 * Browsing/search/filter for the book library.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const access = searchParams.get("access") ?? undefined; // "FREE" | "PREMIUM"
  const language = searchParams.get("language") ?? undefined;
  const q = searchParams.get("q") ?? undefined;

  const books = await prisma.book.findMany({
    where: {
      ...(access ? { accessType: access as "FREE" | "PREMIUM" } : {}),
      ...(language ? { language } : {}),
      ...(category ? { category: { slug: category } } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { author: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ books });
}
