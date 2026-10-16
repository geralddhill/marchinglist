import "server-only";
import { db } from "@/db/drizzle";
import { cacheTag } from "next/cache";

export async function findUserByUsername(username: string) {
  "use cache"
  // TODO: updateTag when writing profile update function
  cacheTag(`${username}-profile`)
  return db.query.users.findFirst({ where: { username } });
}