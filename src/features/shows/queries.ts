import 'server-only'
import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import {headers} from "next/headers";

export async function listPublishedShows() {
  return db.query.shows.findMany({
    columns: {
      id: false,
      ownerId: false,
      published: false,
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

export async function listPublishedShowsByUserId(userId: string) {
  return db.query.shows.findMany({
    columns: {
      id: false,
      ownerId: false,
      published: false,
    },
    where: {
      ownerId: userId,
      published: true
    }
  })
}

export async function findPublishedShowBySlug(slug: string) {
  "use cache";
  return db.query.shows.findFirst({
    columns: {
      id: false,
      ownerId: false,
      published: false,
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
  const show = await db.query.shows.findFirst({
    columns: {
      id: true
    },
    where: {
      slug
    }
  })

  return !!show;
}

export async function listCurrentUserShows() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) throw new Error("Unauthorized");

  return db.query.shows.findMany({
    columns: {
      id: false,
      ownerId: false,
    },
    where: {
      ownerId: session.user.id
    },
  });
}

export async function findCurrentUserShowBySlug(slug: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  return db.query.shows.findFirst({
    columns: {
      ownerId: false,
    },
    where: {
      ownerId: session.user.id,
      slug
    },
  });
}