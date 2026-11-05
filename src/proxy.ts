import { NextRequest, NextResponse } from "next/server";

const roles = ["PARENT", "CHILD", "DONOR", "ADMIN"];

function decodeSegment(segment: string): Record<string, unknown> | null {
  try {
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) return null;

  const [encodedHeader, encodedPayload, encodedSignature, extra] = token.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature || extra !== undefined) return null;
  const header = decodeSegment(encodedHeader);
  const payload = decodeSegment(encodedPayload);
  if (!header || header.alg !== "HS256" || !payload) return null;
  if (typeof payload.userId !== "string" || !roles.includes(String(payload.role))) return null;
  if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) return null;

  try {
    const signatureBase64 = encodedSignature.replace(/-/g, "+").replace(/_/g, "/");
    const signaturePadded = signatureBase64.padEnd(Math.ceil(signatureBase64.length / 4) * 4, "=");
    const signature = Uint8Array.from(atob(signaturePadded), (character) => character.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signature,
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
    );
    return valid ? payload : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/account/sign-in" || pathname === "/account/sign-up") return NextResponse.next();

  const cookieName = process.env.AUTH_SESSION_COOKIE_NAME || "matchids_session";
  const token = request.cookies.get(cookieName)?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session) {
    const signIn = new URL("/account/sign-in", request.url);
    signIn.searchParams.set("next", pathname);
    return NextResponse.redirect(signIn);
  }

  if (pathname.startsWith("/admin") && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};