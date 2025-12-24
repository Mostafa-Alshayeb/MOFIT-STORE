// lib/auth-utils.ts
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "./types";

export async function getUserFromSession(
  _req?: NextRequest
): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return verifyJWT(token);
}

/* =========================
   Password helpers (dev only)
   ========================= */

export function hashPassword(password: string): string {
  // ⚠️ dev only – use bcrypt in production
  return Buffer.from(password).toString("base64");
}

export function verifyPassword(password: string, hash: string): boolean {
  return Buffer.from(password).toString("base64") === hash;
}

/* =========================
   JWT helpers
   ========================= */

export function createJWT(payload: {
  id: string; // ✅ userId string
  email: string;
  name: string;
}): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyJWT(token: string): User | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    return jwt.verify(token, secret) as User;
  } catch {
    return null;
  }
}
