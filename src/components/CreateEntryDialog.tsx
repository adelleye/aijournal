"use client";
import React, { useState } from "react";
// Importing Dialog components from UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

// Importing Plus from lucide-react for the plus icon
import { Loader2, Plus } from "lucide-react";
// Importing Input and Button from UI
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// Importing useMutation from @tanstack/react-query for mutation function
import { useMutation } from "@tanstack/react-query";
// Importing useRouter from next/navigation for routing
import { useRouter } from "next/navigation";

// Importing axios for making API requests
import axios from "axios";

// Defining Props type as an empty object
type Props = {};

// Defining CreateEntryDialog component
const CreateEntryDialog = (props: Props) => {
  // Using useRouter hook for routing
  const router = useRouter();
  // Using useState hook for managing input state
  const [input, setInput] = useState("");

  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post("/api/uploadToFirebase", {
        noteId,
      });
      return response.data;
    },
  });

  // Defining createJournalEntry mutation
  const createJournalEntry = useMutation({
    mutationFn: async () => {
      // Making a POST request to /api/CreateJournalEntry with input as name
      const response = await axios.post("/api/CreateJournalEntry", {
        name: input,
      });
      // Returning the response data
      return response.data;
    },
  });

  // Defining handleSubmit function for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Preventing default form submission
    e.preventDefault();

    // Checking if input is empty
    if (input === "") {
      // Alerting the user to add a title
      window.alert("Please add a Title for your entry");
      // Returning to prevent further execution
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
    <Dialog>
      <DialogTrigger>
        <div className=" border-2 flex border-blue-500 h-full rounded-md items-center justify-center sm:flex-col hover:shadow-md transition hover:-translate-y-1 flex-row p-4 ">
          <Plus className="w-6 h-6 text-blue-500" strokeWidth={2} />
          <h2 className="font-semibold text-blue-500 sm:mt-2">
            New Journal Entry
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> New Journal Entry</DialogTitle>
          <DialogDescription>
            Add a Title, then click the "create" button below, to create a new
            journal entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="H."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2 ">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button type="submit" disabled={createJournalEntry.isPending}>
              {createJournalEntry.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Exporting CreateEntryDialog as default
export default CreateEntryDialog;
