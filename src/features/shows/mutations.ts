import "server-only"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { shows } from "@/db/schema";
import { db } from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { utapi } from "@/lib/uploadthing-server";

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


/**
 * Updates show's thumbnail in database and deletes old thumbnail from Uploadthing
 * @param userId Already authorized user id
 * @param showId Show id passed as input to Uploadthing
 * @param newKey Uploadthing file key for the new thumbnail
 */
export async function updateShowThumbnail(showId: number, userId: string, newKey: string) {
  const oldKey = await db.transaction(async (tx) => {
    const [current] = await tx
      .select({ oldKey: shows.thumbnailKey })
      .from(shows)
      .where(and(eq(shows.ownerId, userId), eq(shows.id, showId)))
      .for("update");

    await tx
      .update(shows)
      .set({ thumbnailKey: newKey })
      .where(and(eq(shows.ownerId, userId), eq(shows.id, showId)));

    return current?.oldKey ?? null;
  });

  if (oldKey) {
    await utapi
      .deleteFiles(oldKey)
      .catch((err) =>
        console.error("Failed to delete old thumbnail", oldKey, err),
      );
  }
}

export async function deleteShowThumbnail(showId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const response = await db.query.shows.findFirst({
    columns: {
      thumbnailKey: true,
    },
    where: {
      ownerId: session.user.id,
      id: showId,
    },
  });

  if (!response) throw new Error("Unauthorized");
  const key = response.thumbnailKey;

  await db
    .update(shows)
    .set({ thumbnailKey: null })
    .where(and(eq(shows.ownerId, session.user.id), eq(shows.id, showId)));

  return key;
}