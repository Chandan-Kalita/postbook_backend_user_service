import { and, eq, notInArray } from "drizzle-orm";
import { db } from "../config/db"
import { followingTable, usersTable } from "../db/schema";
export class UsersProfileService {
    db: typeof db;
    constructor() {
        this.db = db
    }

    async getProfile(username: string) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.username, username))
        if (users.length === 0) {
            throw new Error("User not found");
        }
        const response = users[0]
        return { id: response.id, username: response.username, name: response.name }
    }

    async getFollowers(username: string) {
        const userId = await this.getUserId(username)
        const followers = await this.db.query.followingTable.findMany({
            where: (followingTable) => eq(followingTable.following_id, userId),
            with: {
                user: {
                    columns: {
                        id: true,
                        username: true,
                        name: true,
                    }
                }
            }
        })
        return followers
    }

    async getFollowersCount(username: string) {
        const count = await this.db.$count(followingTable, eq(followingTable.following_id, await this.getUserId(username)))
        return { count }

    }

    async getFollowings(username: string) {
        const userId = await this.getUserId(username)
        const followings = await this.db.query.followingTable.findMany({
            where: (followingTable) => eq(followingTable.user_id, userId),
            with: {
                following: {
                    columns: {
                        id: true,
                        username: true,
                        name: true,
                    }
                }
            }
        })
        return followings
    }

    async getFollowingsCount(username: string) {
        const count = await this.db.$count(followingTable, eq(followingTable.user_id, await this.getUserId(username)))
        return { count }
    }

    async userSuggestions(user_id: string, take: number, skip: number) {
        const myFollowings = await this.db.select().from(followingTable).where(eq(followingTable.user_id, user_id))
        const myFollowingsIds = myFollowings.map((following) => following.following_id)
        myFollowingsIds.push(user_id)
        const suggestions = await this.db.select({ username: usersTable.username, name: usersTable.name, id: usersTable.id }).from(usersTable).where(notInArray(usersTable.id, myFollowingsIds))
        return suggestions
    }

    async getUserId(username: string) {
        let users = await this.db.select().from(usersTable).where(eq(usersTable.username, username))
        if (users.length === 0) {
            throw new Error("User not found");
        }
        const response = users[0]
        return response.id
    }

    async follow(user_id: string, following_id: string) {
        return await this.db.insert(followingTable).values({ user_id, following_id })
    }
    async unFollow(user_id: string, following_id: string) {
        return await this.db.delete(followingTable).where(and(eq(followingTable.user_id, user_id), eq(followingTable.following_id, following_id)))
    }
}