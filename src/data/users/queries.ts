import "server-only";
import { db } from "@/db/drizzle";
import { cacheTag } from "next/cache";

export async function findUserByUsername(username: string) {
  "use cache"
  const user = await db.query.users.findFirst({ where: { username } });

  if (user) {
    cacheTag(`${user.id}-profile`);
  }

  return user;
}