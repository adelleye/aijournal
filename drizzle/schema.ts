import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const notes = pgTable("notes", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	imageUrl: text("imageUrl"),
	userId: text("user_id").notNull(),
	editorState: text("editor_state"),
	uuid: uuid("uuid").notNull(),
});