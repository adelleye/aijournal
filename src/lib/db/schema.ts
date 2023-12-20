// Importing necessary functions and types from "drizzle-orm/pg-core"
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Defining a table in the database named "notes" with specific columns and their properties
export const $notes = pgTable("notes", {
  // "id" is a unique number that is automatically generated for each note
  id: serial("id").primaryKey(),
  // "name" is the name of the note and it cannot be null (i.e., it must have a value)
  name: text("name").notNull(),
  // "createdAt" is the time when the note was created. It is automatically set to the current time and cannot be null
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // "imageUrl" is the URL of the image associated with the note
  imageUrl: text("imageUrl"),
  // "userId" is the ID of the user who created the note and it cannot be null
  userId: text("user_id").notNull(),
  // "editorState" is the state of the editor when the note was created/ contents of the entry/note
  editorState: text("editor_state"),
});

// Defining a type "NoteType" based on the structure of a new note to be inserted into the "notes" table
export type NoteType = typeof $notes.$inferInsert;
