import { runQuery } from "@/db/runQuery";

export async function deletePage(pageId: string) {
  if (!pageId) {
    return null;
  }
  const pages = await runQuery("deletePage", pageId);
  return pages;
}
