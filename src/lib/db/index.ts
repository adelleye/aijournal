// // Importing neon and neonConfig from @neondatabase/serverless
// import { neon, neonConfig } from "@neondatabase/serverless";
// // Importing drizzle from drizzle-orm/neon-http
// import { drizzle } from "drizzle-orm/neon-http";

// // Setting fetchConnectionCache to true in neonConfig
// neonConfig.fetchConnectionCache = true;

// if (!process.env.DATABASE_URL) {
//   // necessary to load for migration files
//   require("dotenv").config();

//   if (!process.env.DATABASE_URL) {
//     throw new Error("DATABASE_URL is not defined.");
//   }
// }

// // Creating a new neon instance with the DATABASE_URL
// const sql = neon(process.env.DATABASE_URL);

// // Exporting a drizzle instance with the neon instance
// export const db = drizzle(sql);

import { Pool } from "pg";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// Load environment variables for standalone scripts
if (!process.env.DATABASE_URL) {
  require("dotenv").config();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined.");
  }
}

// Export an async function to query the database
// export const db = {
//   async query(text, params) {
//     const client = await pool.connect();

//     try {
//       const result = await client.query(text, params);
//       return result;
//     } catch (err) {
//       console.error("Database query error", err);
//       throw err;
//     } finally {
//       client.release();
//     }
//   },
// };

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// Initialize your database connection
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
export const db = drizzle(sql);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// async function checkDatabaseConnection() {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT NOW()");
//     console.log(
//       "Database connection successful. Current server time:",
//       result.rows[0].now
//     );
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// }

// checkDatabaseConnection();
