// Importing necessary functions and types from "drizzle-orm/pg-core"
import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Defining a table in the database named "notes" with specific columns and their properties
export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").notNull(), // public facing identifier
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  imageUrl: text("imageUrl"),
  userId: text("user_id").notNull(),
  editorState: text("editor_state"),
});

// Defining a type "NoteType" based on the structure of a new note to be inserted into the "notes" table
export type NoteType = typeof $notes.$inferInsert;
