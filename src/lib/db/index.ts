// Importing neon and neonConfig from @neondatabase/serverless
import { neon, neonConfig } from "@neondatabase/serverless";
// Importing drizzle from drizzle-orm/neon-http
import { drizzle } from "drizzle-orm/neon-http";

// Setting fetchConnectionCache to true in neonConfig
neonConfig.fetchConnectionCache = true;

// Checking if DATABASE_URL is defined in the environment variables
if (!process.env.DATABASE_URL) {
  // Throwing an error if DATABASE_URL is not defined
  throw new Error("DATABASE_URL is not defined.");
}

// Creating a new neon instance with the DATABASE_URL
const sql = neon(process.env.DATABASE_URL);

// Exporting a drizzle instance with the neon instance
export const db = drizzle(sql);
