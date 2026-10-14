import 'server-only'
import { db } from "@/db/drizzle";
import { showsTable } from "@/db/schema";

export async function getShows() {
  return db.select().from(showsTable);
}
