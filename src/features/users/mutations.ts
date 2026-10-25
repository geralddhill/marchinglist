import "server-only";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "@/lib/uploadthing-server";
import { publicFileUrl } from "@/lib/files";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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

export async function deleteUserAvatar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const key = session.user.avatarKey;
  await db
    .update(users)
    .set({ avatarKey: null, image: null })
    .where(eq(users.id, session.user.id));

  return key;
}