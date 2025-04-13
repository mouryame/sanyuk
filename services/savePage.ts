"use server";
import getPageId from "@/utils/getPageId";
import { runQuery } from "@/db/runQuery";

async function savePage(pageData: any, pageContent: any) {
  const data = {
    ...pageData,
    content: JSON.stringify(pageContent),
  };
  const pageId = getPageId(data);
  data.pageId = pageId;
  data.status = "open";
  data.createdAt = new Date().toISOString();
  data.updatedAt = new Date().toISOString();
  data.createdBy = "admin";
  data.updatedBy = "admin";

  // Pass parameters in the exact order as the columns in the INSERT statement
  const params = [
    data.pageId,
    data.topic,
    data.tags,
    data.title,
    data.content,
    data.status,
    data.createdAt,
    data.updatedAt,
    data.createdBy,
    data.updatedBy,
    data.deletedBy,
    data.deletedAt,
  ];

  const res = await runQuery("insertPage", params);
  if (res) {
    return {
      success: true,
      pageId: data.pageId,
      message: "Page saved successfully",
    };
  }
  return {
    success: false,
    pageId: data.pageId,
    message: "Failed to save page",
  };
}

export default savePage;
