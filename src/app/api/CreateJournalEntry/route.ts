// /api/CreateJournalEntry

// Importing necessary modules and functions
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Function to handle POST request
export async function POST(req: Request) {
  // Extracting userId from auth
  const { userId } = auth();

  // If userId is not present, return Unauthorized
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Parsing the request body
  const body = await req.json();
  const { name } = body;
  const uuid = uuidv4(); // Generates a new UUID

  // Generating image description using AI

  // const image_description = await generateImagePrompt(name);
  // console.log(image_description);

  // // If image description is not generated, return error
  // if (!image_description) {
  //   return new NextResponse("failed to generate image description", {
  //     status: 500,
  //   });
  // }

  // // Generating image using AI
  // const image_url = await generateImage(image_description);

  // // If image is not generated, return error
  // if (!image_url) {
  //   return new NextResponse("failed to generate image", {
  //     status: 500,
  //   });
  // }

  // Inserting new note into the database
  const notes_id = await db
    .insert($notes)
    .values({
      uuid,
      name,
      userId,
      // imageUrl: image_url,
    })
    .returning({
      insertedId: $notes.id,
    });

  console.log("SERVER", NextResponse.json);

  // Returning the inserted note's id
  return NextResponse.json({
    note_id: notes_id[0].insertedId,
  });
}
