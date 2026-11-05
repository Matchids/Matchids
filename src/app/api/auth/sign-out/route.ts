import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  let validOrigin = false;
  try {
    validOrigin = Boolean(origin && new URL(origin).origin === new URL(request.url).origin);
  } catch {
    validOrigin = false;
  }
  if (!validOrigin) {
    return NextResponse.json({ error: "Request could not be verified." }, { status: 403 });
  }

  const response = NextResponse.json({ signedOut: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return response;
}