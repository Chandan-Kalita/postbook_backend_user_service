import { sql } from "drizzle-orm";
import { integer, pgTable, varchar, uuid, text, } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    name: varchar({ length: 255 }),
    username: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
});
