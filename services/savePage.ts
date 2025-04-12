"use server";
import logger from "@/utils/logger";

function savePage(pageData: any, pageContent: any) {
  const data = {
    ...pageData,
    content: pageContent,
  };
  logger.log(data);
}

export default savePage;
