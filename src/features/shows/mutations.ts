import "server-only"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { shows } from "@/db/schema";
import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";

type NewShow = Omit<
  typeof shows.$inferInsert,
  "ownerId" | "published" | "thumbnailKey"
>;

export async function insertShow(data: NewShow) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  await db.insert(shows).values({ ownerId: session.user.id, ...data });
}

export async function updateShow(id: number, data: NewShow) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  await db.update(shows).set(data).where(and(eq(shows.ownerId, session.user.id), eq(shows.id, id)))
}