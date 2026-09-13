// POST /api/admin/logout - снимает куку сессии
import { NextResponse } from "next/server";
import { clearedCookie } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(clearedCookie());
  return response;
}
