import { prisma } from "@/lib/db/prisma";
import { demoBooks } from "@/data/demo-books";

export interface CatalogBook {
  id: string;
  title: string;
  description: string;
  author: string;
  language: string;
  ageRange: [number, number];
  accessType: "FREE" | "PREMIUM";
  priceCents: number;
  currency: string;
  category: string;
  coverImageUrl: string | null;
  isDemoContent: boolean;
}

export interface CatalogProduct {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
}

function localSampleBooks(): CatalogBook[] {
  return demoBooks.map((book) => ({
    ...book,
    currency: "USD",
    category: book.category,
    coverImageUrl: null,
  }));
}

export async function getPublishedBooks(): Promise<CatalogBook[]> {
  if (process.env.DATABASE_URL) {
    try {
      const books = await prisma.book.findMany({
        where: { publishedAt: { not: null }, isDemoContent: false },
        include: { category: true },
        orderBy: { publishedAt: "desc" },
      });
      if (books.length || process.env.NODE_ENV === "production") {
        return books.map((book) => ({
        id: book.id,
        title: book.title,
        description: book.description,
        author: book.author,
        language: book.language,
        ageRange: [book.ageRangeMin, book.ageRangeMax],
        accessType: book.accessType,
        priceCents: book.priceCents,
        currency: book.currency,
        category: book.category?.name ?? "Other",
        coverImageUrl: book.coverImageUrl,
        isDemoContent: book.isDemoContent,
        }));
      }
    } catch {
      if (process.env.NODE_ENV === "production") return [];
    }
  }

  return process.env.NODE_ENV !== "production" ? localSampleBooks() : [];
}

export async function getPublishedArtworks() {
  if (!process.env.DATABASE_URL) return [];
  try {
    return await prisma.artwork.findMany({
      where: { status: "PUBLISHED", isDemoContent: false },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getAvailableProducts(): Promise<CatalogProduct[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    return await prisma.product.findMany({
      where: { status: "PUBLISHED", isAvailable: true, stockQuantity: { gt: 0 } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        priceCents: true,
        currency: true,
        imageUrl: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getGiveBackContent() {
  const empty = { campaigns: [], organizations: [], reports: [] };
  if (!process.env.DATABASE_URL) return empty;

  const now = new Date();
  try {
    const [campaigns, organizations, reports] = await Promise.all([
      prisma.donationCampaign.findMany({
        where: {
          isActive: true,
          AND: [
            { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
            { OR: [{ endsAt: null }, { endsAt: { gte: now } }] },
          ],
        },
        select: { id: true, title: true, description: true },
        orderBy: { startsAt: "asc" },
      }),
      prisma.verifiedOrganization.findMany({
        where: { verifiedAt: { not: null } },
        select: { id: true, name: true, description: true, website: true },
        orderBy: { verifiedAt: "desc" },
      }),
      prisma.impactReport.findMany({
        where: { publishedAt: { not: null } },
        select: { id: true, periodStart: true, periodEnd: true, summary: true },
        orderBy: { periodEnd: "desc" },
      }),
    ]);
    return { campaigns, organizations, reports };
  } catch {
    return empty;
  }
}