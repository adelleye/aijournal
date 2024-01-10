import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

require("dotenv").config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined.");
}

// Initialize your database connection
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(sql);
