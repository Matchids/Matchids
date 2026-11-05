import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Online donations are unavailable until a payment provider and server-side verification flow are operational." },
    { status: 503 }
  );
}