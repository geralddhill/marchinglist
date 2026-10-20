import 'server-only'
import { db } from "@/db/drizzle";

export async function getShows() {
  return db.query.shows.findMany({
    columns: {
      id: false,
      ownerId: false
    },
    with: {
      owner: {
        columns: {
          name: true,
          username: true,
          image: true,
        }
      }
    },
    where: {
      published: true
    }
  });
}

export async function getShowsByUser(userId: string) {
  return db.query.shows.findMany({
    columns: {
      id: false,
      ownerId: false
    },
    where: {
      ownerId: userId,
      published: true
    }
  })
}

export async function findShowBySlug(slug: string) {
  "use cache";
  return db.query.shows.findFirst({
    columns: {
      id: false,
      ownerId: false
    },
    with: {
      owner: {
        columns: {
          name: true,
          username: true,
          image: true,
        }
      }
    },
    where: {
      slug,
      published: true
    }
  })
}

export async function existsSlug(slug: string) {
  const show = db.query.shows.findFirst({
    columns: {
      id: true
    },
    where: {
      slug
    }
  })

  return !!show;
}