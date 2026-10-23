"use server"

import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "@/lib/uploadthing-server";

export async function deleteUserAvatar() {
  "use server";
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
  if (key) await utapi.deleteFiles(key);
}
