import 'server-only'
import { db } from "@/db/drizzle";

export async function getShows() {
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
