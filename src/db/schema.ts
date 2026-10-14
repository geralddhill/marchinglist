import {
  bigint,
  check,
  integer,
  pgTable,
  smallint,
  text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const showsTable = pgTable(
  "shows",
  {
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    price: integer(),
    duration: smallint().notNull(),
    thumbnail_url: text()
  },
  (table) => [
    check("title_not_empty_check", sql`char_length(${table.title}) > 0`),
    check("price_not_negative_check", sql`${table.price} >= 0`),
    check("duration_not_negative_check", sql`${table.duration} >= 0`),
    check("duration_maximum_check", sql`${table.duration} < 3600`)
  ],
);
