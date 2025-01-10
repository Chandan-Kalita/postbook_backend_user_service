import { desc, eq } from "drizzle-orm";
import { db } from "../config/db"
import { postsTable, usersTable } from "../db/schema";
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

    async getAll(take: number, skip: number) {
        return this.db.query.postsTable.findMany({
            columns: {
                id: true,
                content: true,
                created_at: true,
                updated_at: true,
            },
            with: {
                user: true
            }
        })
    }
}