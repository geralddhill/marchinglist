import {
  bigint,
  check,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  boolean,
  index,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const difficultyEnum = pgEnum("difficulty", ["beginning", "intermediate", "advanced"]);

export const shows = pgTable(
  "shows",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    price: integer("price"),
    duration: smallint().notNull(),
    thumbnailUrl: text("thumbnail_url"),
    description: text("description").notNull().default(""),
    difficulty: difficultyEnum("difficulty").notNull(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [
    check("title_not_empty_check", sql`char_length(${table.title}) > 0`),
    check("price_not_negative_check", sql`${table.price} >= 0`),
    check("duration_not_negative_check", sql`${table.duration} >= 0`),
    check("duration_maximum_check", sql`${table.duration} < 3600`),
    check(
      "valid_slug_check",
      sql`${table.slug} ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND char_length(${table.slug}) >= 1 AND char_length(${table.slug}) <= 100`,
    ),
  ],
);

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    username: varchar("username", { length: 255 }).unique(),
    displayUsername: text("display_username"),
  },
  (table) => [
    check("valid_username_check", sql`${table.username} ~ '^[a-z0-9_.]+$'`),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [index("sessions_userId_idx").on(table.userId)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("accounts_userId_idx").on(table.userId)],
);

export const verifications = pgTable(
  "verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);
