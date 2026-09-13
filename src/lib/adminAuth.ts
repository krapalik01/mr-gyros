// src/lib/adminAuth.ts
// Простая авторизация админки: один пароль из ADMIN_PASSWORD, сессия в httpOnly-куке.
// Значение куки - HMAC от пароля, поэтому смена пароля разлогинивает все устройства.

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mg_admin";
const SESSION_DAYS = 30;

const adminPassword = () => process.env.ADMIN_PASSWORD ?? "";

export const isAdminConfigured = () => adminPassword().length >= 6;

const sessionToken = () =>
  createHmac("sha256", adminPassword()).update("mr-gyros-admin-session-v1").digest("hex");

const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

export const checkPassword = (input: string) =>
  isAdminConfigured() && safeEqual(input, adminPassword());

/** Проверка куки текущего запроса (server components и route handlers) */
export async function isAdminRequest(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(value && safeEqual(value, sessionToken()));
}

export const sessionCookie = () => ({
  name: ADMIN_COOKIE,
  value: sessionToken(),
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * SESSION_DAYS,
});

export const clearedCookie = () => ({
  ...sessionCookie(),
  value: "",
  maxAge: 0,
});
