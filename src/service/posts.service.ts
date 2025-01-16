import { desc, eq, inArray, not } from "drizzle-orm";
import { db } from "../config/db"
import { followingTable, postsTable, usersTable } from "../db/schema";
import { TypeLoginReqModel, TypePostCreateModel, TypeProfileUpdateReqModel } from "../model/model"
import { comparePassword, hashPassword } from "../utils/password_hash";
import { genJwt } from "../utils/jwt";
export class PostsService {
    db: typeof db;
    constructor() {
        this.db = db
    }

    async createPost(data: TypePostCreateModel, user_id: string) {
        const response = await this.db.insert(postsTable).values({ content: data.content, user_id: user_id }).returning();
        return response[0]
    }

    async getAll(take: number, skip: number, user_id: string) {
        const res = await this.db.select({
            id: postsTable.id,
            content: postsTable.content,
            created_at: postsTable.created_at,
            updated_at: postsTable.updated_at,
            user: {
                id: usersTable.id,
                name: usersTable.name,
                username: usersTable.username,
            }
        }).from(followingTable)
            .where(eq(followingTable.user_id, user_id))
            .innerJoin(postsTable, eq(followingTable.following_id, postsTable.user_id))
            .innerJoin(usersTable, eq(followingTable.following_id, usersTable.id))
            .limit(take).offset(skip).orderBy(desc(postsTable.created_at));
        return res
    }
}