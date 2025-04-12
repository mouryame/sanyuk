import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import { useEffect } from "react";
import logger from "@/utils/logger";
import savePage from "@/services/savePage";

export default function PageContent({
  changeView,
}: {
  changeView: () => void;
}) {
  let editor: EditorJS | null = null;
  useEffect(() => {
    if (!editor) {
      editor = new EditorJS({
        holder: "editorjs",
        inlineToolbar: ["link", "marker", "bold", "italic"],
        tools: {
          header: Header,
          paragraph: Paragraph,
          image: Image,
          list: List,
          table: Table,
        },
      });
    }
  }, []);

  function handleSave() {
    editor
      ?.save()
      .then((data) => {
        savePage(
          JSON.parse(localStorage.getItem("pageData") || "{}"),
          data.blocks
        );
        localStorage.removeItem("pageData");
        localStorage.removeItem("pageContent");
      })
      .catch((err) => {
        logger.error(err);
      });
  }
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1>Page Content</h1>
      <Button onClick={() => changeView()}>Back</Button>
      <Button onClick={handleSave}>Save</Button>
      <div className="border rounded p-4">
        <div id="editorjs" />
      </div>
    </div>
  );
}
