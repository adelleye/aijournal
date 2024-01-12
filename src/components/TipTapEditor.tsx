"use client";
// Importing necessary libraries and components
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { useCompletion } from "ai/react";
import TipTapMenuBar from "./TipTapMenuBar";
import { NoteType } from "@/lib/db/schema";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Defining the type of the note
type Props = { note: NoteType; onAICompletion: (completion: string) => void };

// Main component
const TipTapEditor = ({ note, onAICompletion }: Props) => {
  // State for the editor
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  // Using AI completion
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  // Mutation for saving entries
  const saveEntries = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveEntries", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  // Custom text with keyboard shortcuts
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split(" ").join(" ");
          complete(prompt);
          console.log("The journal entry: ", prompt);

          return true;
        },
      };
    },
  });

  // Function to handle reflection click
  const handleReflectClick = () => {
    const prompt = editor?.getText() || ""; // Get current text from the editor
    console.log("The journal entry: ", prompt);
    complete(prompt); // Log the text to the console
  };

  // Using the editor
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");

  // Effect to handle completion
  React.useEffect(() => {
    if (!completion || !editor) return;

    // If the completion has not changed, don't update the state
    if (completion === lastCompletion.current) return;

    lastCompletion.current = completion; // Update the last completion reference
    onAICompletion(completion); // Pass the entire completion to the callback

    console.log("reflection:", completion);
  }, [completion, editor]);

  // Debouncing the editor state
  const debouncedEditorState = useDebounce(editorState, 500);

  // Effect to handle saving of entries
  React.useEffect(() => {
    console.log(debouncedEditorState, "hello");
    if (debouncedEditorState === "") return;
    saveEntries.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);
  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {saveEntries.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>

      <div className="h-4"></div>

      <Button onClick={handleReflectClick}> Reflect</Button>
    </>
  );
};

// Exporting the component
export default TipTapEditor;
