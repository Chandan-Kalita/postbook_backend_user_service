
import 'dotenv/config';
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema"
export const db = drizzle(process.env.DATABASE_URL!, { schema: schema });
