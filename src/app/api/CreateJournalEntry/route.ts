// /api/CreateJournalEntry

// Importing necessary modules and functions
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const uuid = uuidv4();
  if (!uuid) {
    return new NextResponse("Failed to create uuid for new note", {
      status: 500,
    });
  }
  const name = "Some name";

  const newNote = await db
    .insert($notes)
    .values({
      uuid,
      name,
      userId,
    })
    .returning({
      uuid: $notes.uuid,
      id: $notes.id,
    });

  console.log("SERVER JSON", NextResponse.json);

  return NextResponse.json({
    note_uuid: newNote[0].uuid,
    note_id: newNote[0].id,
  });
}

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
