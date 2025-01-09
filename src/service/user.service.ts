import { eq } from "drizzle-orm";
import { db } from "../config/db"
import { usersTable } from "../db/schema";
import { TypeLoginReqModel } from "../model/model"
import { comparePassword, hashPassword } from "../utils/password_hash";
import { genJwt } from "../utils/jwt";
export class UserService {
    db: typeof db;
    constructor() {
        this.db = db
    }

    async login(data: TypeLoginReqModel) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.username, data.username))
        let user: { username: string, password: string } | null = null;
        if (users.length === 0) {
            const hashedPassword = await hashPassword(data.password)
            users = await this.db.insert(usersTable).values({ username: data.username, password: hashedPassword }).returning();
        }
        user = users[0];
        if (!await comparePassword(data.password, user.password)) {
            throw new Error("Invalid username/password");
        }
        return { token: genJwt({ username: user.username }) };
    }

    async profile(username: string) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.username, username))
        if (users.length === 0) {
            throw new Error("User not found");
        }
        const response = users[0]
        return { id: response.id, username: response.username, name: response.name }
    }

    async getUser(username: string) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.username, username))
        if (users.length === 0) {
            throw new Error("User not found");
        }
        const response = users[0]
        return { id: response.id, username: response.username, name: response.name }
    }

    async updateProfile(username: string) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.username, username))
        if (users.length === 0) {
            throw new Error("User not found");
        }
        const response = users[0]
        return { id: response.id, username: response.username, name: response.name }
    }

    async logout() {
        const response = {}
        return response
    }
}