import { NextResponse } from "next/server";
import { getPublishedArtworks } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const artworks = await getPublishedArtworks();
  return NextResponse.json({ artworks });
}