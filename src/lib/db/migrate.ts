import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

// import postgres from "postgres";

// // Initialize your database connection
// const sql = postgres("...", { max: 1 });
// const db = drizzle(sql);

async function runMigration() {
  await migrate(db, { migrationsFolder: "drizzle" });
}

runMigration()
  .then(() => console.log("Migration completed successfully."))
  .catch((error) => console.error("Migration failed:", error));


  // import { drizzle } from "drizzle-orm/postgres-js";
  // import { migrate } from "drizzle-orm/postgres-js/migrator";
  // import postgres from "postgres";
  // const sql = postgres("your_connection_string", { max: 1 });
  // const db = drizzle(sql);
  // await migrate(db, { migrationsFolder: "drizzle" });
  // await sql.end();