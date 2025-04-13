// components/EditorComponent.tsx
"use client";
import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import logger from "@/utils/logger";

const EditorComponent = ({
  editorRef,
  setContent,
}: {
  editorRef: React.RefObject<EditorJS | null>;
  setContent: (content: object | null) => void;
}) => {
  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        inlineToolbar: ["link", "marker", "bold", "italic"],
        tools: {
          header: Header,
          paragraph: Paragraph,
          image: Image,
          list: List,
          table: Table,
        },
        onReady: () => {
          editorRef.current = editor;
        },
        onChange: async () => {
          try {
            const data = await editor.save();
            setContent(data.blocks);
          } catch (error) {
            logger.error("Error saving content on change:", error);
          }
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="min-h-[300px]" />;
};

export default EditorComponent;
