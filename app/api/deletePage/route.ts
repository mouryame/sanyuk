import { deletePage } from "@/services/deletePage";
import { NextRequest } from "next/server";

async function DELETE(request: NextRequest) {
  const { pageId } = await request.json();
  if (!pageId) {
    return new Response(JSON.stringify({ error: "Page ID is required" }), {
      status: 400,
    });
  }
  const pages = await deletePage(pageId);
  return new Response(JSON.stringify(pages));
}

export { DELETE };
