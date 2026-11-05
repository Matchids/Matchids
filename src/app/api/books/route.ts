import { NextRequest, NextResponse } from "next/server";
import { getPublishedBooks } from "@/lib/catalog";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = (params.get("q") ?? "").trim().slice(0, 100).toLowerCase();
  const access = params.get("access");
  const language = params.get("language");
  const category = params.get("category");
  if (access && !["FREE", "PREMIUM"].includes(access)) {
    return NextResponse.json({ error: "Invalid access filter." }, { status: 400 });
  }
  if (language && !["en", "fr", "ht"].includes(language)) {
    return NextResponse.json({ error: "Invalid language filter." }, { status: 400 });
  }
  const books = await getPublishedBooks();

  const filtered = books.filter((book) => {
    if (access && book.accessType !== access) return false;
    if (language && book.language !== language) return false;
    if (category && book.category.toLowerCase() !== category.toLowerCase()) return false;
    return !query || `${book.title} ${book.author} ${book.description}`.toLowerCase().includes(query);
  });

  return NextResponse.json({ books: filtered });
}