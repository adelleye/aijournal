"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import axios from "axios";
// import PlusIcon from "@mui/icons-material/PlusIcon";

type Props = {};

const CreateEntryDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post("/api/uploadToFirebase", {
        noteId,
      });
      return response.data;
    },
  });

  const createJournalEntry = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/CreateJournalEntry", {
        name: input,
      });
      console.log(response.data);
      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "") {
      window.alert("Please add a Title for your entry");
      return;
    }

    // Mutating with createJournalEntry
    createJournalEntry.mutate(undefined, {
      // On success, logging the note_id and routing to the new entry
      onSuccess: ({ note_id }) => {
        console.log("Entry created");
        console.log("this is the Entry note id:", { note_id });
        uploadToFirebase.mutate(note_id);
        router.push(`/journalentry/${note_id}`);
      },
      // On error, logging the error and alerting the user
      onError: (error) => {
        console.error(error);
        window.alert("Failed to create new journal entry");
      },
    });
  };

  // Returning the Dialog component
  return (
    <Button onClick={() => createJournalEntry()}>
      <p className="font-semibold text-white-500">New Journal Entry</p>
    </Button>

    // <Dialog>
    //   <DialogTrigger>
    //     <div className=" border-2 flex border-blue-500 h-full rounded-md items-center justify-center sm:flex-col hover:shadow-md transition hover:-translate-y-1 flex-row p-4 ">
    //       <Plus className="w-6 h-6 text-blue-500" strokeWidth={2} />
    //       <h2 className="font-semibold text-blue-500 sm:mt-2">
    //         New Journal Entry
    //       </h2>
    //     </div>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle> New Journal Entry</DialogTitle>
    //       <DialogDescription>
    //         Add a Title, then click the "create" button below, to create a new
    //         journal entry.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <form onSubmit={handleSubmit}>
    //       <Input
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         placeholder="I'm feeling..."
    //       />
    //       <div className="h-4"></div>
    //       <div className="flex items-center gap-2 ">
    //         <Button type="reset" variant={"secondary"}>
    //           Cancel
    //         </Button>
    //         <Button type="submit" disabled={createJournalEntry.isPending}>
    //           {createJournalEntry.isPending && (
    //             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    //           )}
    //           Create
    //         </Button>
    //       </div>
    //     </form>
    //   </DialogContent>
    // </Dialog>
  );
};

// Exporting CreateEntryDialog as default
export default CreateEntryDialog;
