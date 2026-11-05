import { NextResponse } from "next/server";
import { getAvailableProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getAvailableProducts();
  return NextResponse.json({ products });
}