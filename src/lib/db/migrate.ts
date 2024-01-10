import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

async function runMigration() {
  await migrate(db, { migrationsFolder: "drizzle" });
}

runMigration()
  .then(() => console.log("Migration completed successfully."))
  .catch((error) => console.error("Migration failed:", error));
