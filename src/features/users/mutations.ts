import "server-only";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "@/lib/uploadthing-server";
import { publicFileUrl } from "@/lib/uploadthing-client";

/**
 * Updates user's avatar in database and deletes old avatar from Uploadthing
 * @param userId Already authorized user id
 * @param newKey Uploadthing file key for the new avatar
 */
export async function updateUserAvatar(userId: string, newKey: string) {
  const oldKey = await db.transaction(async (tx) => {
    const [current] = await tx
      .select({ oldKey: users.avatarKey })
      .from(users)
      .where(eq(users.id, userId))
      .for("update");

    await tx
      .update(users)
      .set({ avatarKey: newKey, image: publicFileUrl(newKey) })
      .where(eq(users.id, userId));

    return current?.oldKey ?? null;
  });

  if (oldKey) {
    await utapi
      .deleteFiles(oldKey)
      .catch((err) =>
        console.error("Failed to delete old avatar", oldKey, err),
      );
  }
}

