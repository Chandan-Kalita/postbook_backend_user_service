import { relations, sql } from "drizzle-orm";
import { integer, pgTable, varchar, uuid, text, } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    name: varchar({ length: 255 }),
    username: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
    posts: many(postsTable),
    following: many(followingTable),
}))



export const postsTable = pgTable("posts", {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    content: text(),
    user_id: uuid().notNull().references(() => usersTable.id),
    created_at: integer().default(sql`extract(epoch from now())`),
    updated_at: integer().default(sql`extract(epoch from now())`),
});

export const postRelations = relations(postsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [postsTable.user_id],
        references: [usersTable.id]
    })
}))


export const followingTable = pgTable("following", {
    id: uuid().primaryKey().default(sql`gen_random_uuid()`),
    user_id: uuid().notNull().references(() => usersTable.id), // user_id is following
    following_id: uuid().notNull().references(() => usersTable.id), // following_id is followed
    created_at: integer().default(sql`extract(epoch from now())`),
});

export const followingRelations = relations(followingTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [followingTable.user_id],
        references: [usersTable.id]
    }),
    following: one(usersTable, {
        fields: [followingTable.following_id],
        references: [usersTable.id]
    })
}))