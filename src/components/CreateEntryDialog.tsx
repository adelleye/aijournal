"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {};

const CreateEntryDialog = (props: Props) => {
  const router = useRouter();

  // const uploadToFirebase = useMutation({
  //   mutationFn: async (noteId: string) => {
  //     const response = await axios.post("/api/uploadToFirebase", {
  //       noteId,
  //     });
  //     return response.data;
  //   },
  // });

  const createJournalEntry = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/CreateJournalEntry"); // TODO eventually delay this till user starts typing then create db entry
      console.log("response", response.data);
      return response.data;
    },

    onSuccess: (data) => {
      const { note_id, note_uuid } = data;
      router.push(`/journalentry/${note_id}`);
    },

    onError: (error) => {
      console.error(error);
      window.alert("Failed to create new journal entry");
    },
  });

  return (
    <Button
      onClick={() => createJournalEntry.mutate()}
      disabled={createJournalEntry.isPending}
    >
      <p className="font-semibold text-white-500">New Journal Entry</p>
      {createJournalEntry.isPending && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
    </Button>
  );
};

export default CreateEntryDialog;
