import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

function unavailable() {
  const response = NextResponse.json({ status: "not_ready" }, { status: 503 });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET() {
  if (!process.env.DATABASE_URL) return unavailable();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const response = NextResponse.json({ status: "ready" });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return unavailable();
  }
}