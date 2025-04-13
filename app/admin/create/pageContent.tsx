import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic"; // Dynamic import
import savePage from "@/services/savePage";
import { useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import logger from "@/utils/logger";

// Dynamically import the Editor component with SSR disabled
const Editor = dynamic(() => import("./editorComponent"), {
  ssr: false,
});

export default function PageContent({
  changeView,
}: {
  changeView: () => void;
}) {
  const [content, setContent] = useState<object | null>(null);
  const editorRef = useRef<EditorJS | null>(null);

  async function handleSave() {
    if (!content) {
      return;
    }
    const res = await savePage(
      JSON.parse(localStorage.getItem("pageData") || "{}"),
      content
    );
    if (res.success) {
      logger.log(res.message);
      localStorage.removeItem("pageData");
      localStorage.removeItem("pageContent");
      localStorage.removeItem("currentView");
    } else {
      logger.error(res.message);
    }
    changeView();
  }

  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1>Page Content</h1>
      <Button onClick={changeView}>Back</Button>
      <Button onClick={handleSave}>Save</Button>
      <div className="border rounded p-4">
        <Editor editorRef={editorRef} setContent={setContent} />
      </div>
    </div>
  );
}
