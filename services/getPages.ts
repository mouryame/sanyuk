import { runQuery } from "@/db/runQuery";

export async function getPages() {
  const pages = await runQuery("getAllPages");
  return pages;
}
