import connect from "@/db/connectdb";
import { queries } from "@/db/queries";
import logger from "@/utils/logger";

const db = connect();

export async function runQuery(queryKey: string) {
  try {
    if (!queryKey) {
      throw new Error("Query key is required");
    }

    const query: string = queries[queryKey];

    if (!query) {
      throw new Error(`Query with the key ${queryKey} does not exist`);
    }

    // Wrap db.run in a Promise to use async/await
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this); // `this` is the context of the `run` call, which contains the last insert ID and changes
      });
    });
  } catch (error) {
    logger.error("Error running query:", error);
    throw error;
  }
}
