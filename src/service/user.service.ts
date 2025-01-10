import { eq } from "drizzle-orm";
import { db } from "../config/db"
import { usersTable } from "../db/schema";
import { TypeLoginReqModel, TypeProfileUpdateReqModel } from "../model/model"
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

    async updateProfile(id: string, data: TypeProfileUpdateReqModel) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.id, id))
        if (users.length === 0) {
            throw new Error("User not found");
        }
        const user = users[0]
        const response = await this.db.update(usersTable).set({ name: data.name }).where(eq(usersTable.id, id)).returning();
        return { id: response[0].id, username: response[0].username, name: response[0].name }
    }

    async logout() {
        const response = {}
        return response
    }
}