import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({ status: "ok" });
  response.headers.set("Cache-Control", "no-store");
  return response;
}