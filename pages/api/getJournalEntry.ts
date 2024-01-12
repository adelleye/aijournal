import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //console.log(res); // Add this line to log the response object

  // Ensure we're using a GET request
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log("BREAKPOINT-ONE");

  if (!req.query) {
    return res.status(400).json({ error: "Query parameters are missing" });
  }

  console.log("BREAKPOINTT-TWO");

  // Extract noteId from the query parameters
  const { noteId } = req.query;

  // Validate noteId
  console.log("BREAKPOINT-THREE");

  console.log(typeof res.status); // Should log 'function'
  if (!noteId || Array.isArray(noteId)) {
    return res.status(400).json({ error: "Invalid noteId" });
  }

  try {
    // Authenticate the user (make sure to implement authentication correctly)
    const { userId } = await getAuth(req); // Replace with your authentication logic
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch the note from the database
    const notes = await db
      .select()
      .from($notes)
      .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

    // Check if the note exists
    if (notes.length !== 1) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Send the note data in the response
    const note = notes[0];
    res.status(200).json({ note });
  } catch (error) {
    console.error("Error fetching journal entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
