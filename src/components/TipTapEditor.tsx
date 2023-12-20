"use client";
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

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const saveEntries = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveEntries", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split(" ").join(" ");
          //complete(prompt);
          console.log("The journal entry: ", prompt);

          return true;
        },
      };
    },
  });

  React.useEffect(() => {
    //console.log(completion);
  }, [completion]);

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const debouncedEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    console.log(debouncedEditorState);
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

      <Button> Reflect</Button>
    </>
  );
};

export default TipTapEditor;
