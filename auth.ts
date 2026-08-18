import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * Minimal, real authentication primitives — password hashing and session
 * token issuing/verification. This is intentionally small: session
 * persistence, refresh flow, and OAuth providers are integration points
 * to be filled in as Matchids needs them, not simulated here.
 */

const SESSION_COOKIE_NAME = process.env.AUTH_SESSION_COOKIE_NAME ?? "matchids_session";

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not set — see .env.example.");
  }
  return secret;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface SessionPayload {
  userId: string;
  role: "PARENT" | "CHILD" | "DONOR" | "ADMIN";
}

export function issueSessionToken(payload: SessionPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, getSecret()) as SessionPayload;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME };
