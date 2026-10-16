import * as schema from "@/db/schema";
import { defineRelations } from "drizzle-orm";


export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions({
      from: r.users.id,
      to: r.sessions.userId,
    }),
    accounts: r.many.accounts({
      from: r.users.id,
      to: r.accounts.userId,
    }),
    shows: r.many.shows({
      from: r.users.id,
      to: r.shows.ownerId
    })
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  shows: {
    owner: r.one.users({
      from: r.shows.ownerId,
      to: r.users.id,
      optional: false
    })
  }
}));