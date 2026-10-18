"use server";
import { updateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function refreshUserCache() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  updateTag(`${session.user.id}-profile`);
}
