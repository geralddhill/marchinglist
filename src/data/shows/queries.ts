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

export async function getShowsByUser(userId: string) {
  return db.query.shows.findMany({
    where: {
      ownerId: userId
    }
  })
}

export async function findShowById(showId: number) {
  "use cache";
  return db.query.shows.findFirst({
    where: {
      id: showId
    }
  })
}