import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

export const SESSION_COOKIE_NAME = process.env.AUTH_SESSION_COOKIE_NAME ?? "matchids_session";
const sessionRoles = ["PARENT", "CHILD", "DONOR", "ADMIN"] as const;

export interface SessionPayload {
  userId: string;
  role: (typeof sessionRoles)[number];
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must contain at least 32 characters.");
  return secret;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function issueSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const decoded = jwt.verify(token, getSecret());
    if (typeof decoded === "string" || typeof decoded.userId !== "string") return null;
    if (!sessionRoles.includes(decoded.role as SessionPayload["role"])) return null;
    return { userId: decoded.userId, role: decoded.role as SessionPayload["role"] };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = verifySessionToken(token);
  if (!session) return null;

  try {
    return await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, displayName: true, role: true, locale: true },
    });
  } catch {
    return null;
  }
}