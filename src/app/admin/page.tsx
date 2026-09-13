import type { Metadata } from "next";
import { isAdminConfigured, isAdminRequest } from "@/lib/adminAuth";
import { loadMenu } from "@/lib/menuStorage";
import { AdminApp } from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Админка | Mr. Gyros",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const authed = configured && (await isAdminRequest());
  const menu = authed ? await loadMenu({ fresh: true }) : null;

  return <AdminApp configured={configured} initialAuthed={authed} initialMenu={menu} />;
}
