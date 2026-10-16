import 'server-only'
import { db } from "@/db/drizzle";
import { shows, users } from "@/db/schema";

export type Show = Omit<typeof shows.$inferSelect, "ownerId"> & {
  owner: Pick<typeof users.$inferSelect, "id" | "name" | "username" | "image"> | null
};

export async function getShows(): Promise<Show[]> {
  return db.query.shows.findMany({
    columns: {
      ownerId: false
    },
    with: {
      owner: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        }
      }
    }
  });
}
