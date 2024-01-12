"use client";

import React, { useState, useEffect } from "react";
import DeleteButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import TipTapEditor from "@/components/TipTapEditor";
import Link from "next/link";

type Props = {
  params: { noteId: string };
};

type Note = {
  uuid: string;
  name: string;
  userId: string;
  id?: number;
  createdAt?: Date;
  imageUrl?: string | null;
  editorState?: string | null;
  // include other note properties as needed
};

const JournalPage = ({ params: { noteId } }: Props) => {
  const [note, setNote] = useState<Note | null>(null);
  const [aiOutput, setAIOutput] = useState("");

  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const response = await fetch(`/api/getJournalEntry?noteId=${noteId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch note");
        }
        const data = await response.json();
        setNote(data.note);
      } catch (error) {
        console.error(error);
        // Implement additional error handling
      }
    };

    fetchJournalEntry();
  }, [noteId]);

  const handleAICompletion = (completion: string) => {
    setAIOutput(completion);
  };

  if (!note) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button size="sm">Back</Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {/* Display user name or other relevant info */}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            {note.id !== undefined && <DeleteButton noteId={note.id} />}
          </div>
        </div>
        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} onAICompletion={handleAICompletion} />
        </div>
        <div className="mt-4">{aiOutput || "Waiting for AI Reflection..."}</div>
      </div>
    </div>
  );
};

export default JournalPage;
