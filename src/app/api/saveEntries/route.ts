// This function is responsible for handling POST requests to save entries. It takes a request as input,
// extracts the noteId and editorState from the request body, and updates the corresponding note in the database.
// If the noteId or editorState is missing, it returns a 400 status code. If the note does not exist, it returns a 500 status code.
// If the note's editorState is different from the provided editorState, it updates the note in the database.
// If the function executes successfully, it returns a JSON response with a success status. If an error occurs, it logs the error and returns a JSON response with a failure status.

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { noteId, editorState } = body;
    if (!editorState || !noteId) {
      return new NextResponse("Missing editorState or noteId", { status: 400 });
    }

    noteId = parseInt(noteId);
    const notes = await db.select().from($notes).where(eq($notes.id, noteId));
    if (notes.length != 1) {
      return new NextResponse("failed to update", { status: 500 });
    }

    const note = notes[0];
    if (note.editorState !== editorState) {
      await db
        .update($notes)
        .set({
          editorState,
        })
        .where(eq($notes.id, noteId));
    }
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
