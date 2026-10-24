import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { shows } from "@/db/schema";
import { db } from "@/db/drizzle";

type NewShow = Omit<
  typeof shows.$inferInsert,
  "ownerId" | "published" | "thumbnailKey"
>;

export async function createShow(data: NewShow) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  await db.insert(shows).values({ ownerId: session.user.id, ...data });
}
