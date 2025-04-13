import connect from "@/db/connectdb";
import { queries } from "@/db/queries";
import logger from "@/utils/logger";

const db = connect();

export async function runQuery(queryKey: string, params?: any) {
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
      logger.log(
        `Running query: ${query} with params: ${JSON.stringify(params)}`
      );
      if (queryKey.startsWith("get")) {
        db.all(query, params, function (err, rows) {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        });
      } else {
        db.run(query, params, function (err) {
          if (err) {
            return reject(err);
          }
          resolve(this); // `this` is the context of the `run` call, which contains the last insert ID and changes
        });
      }
    });
  } catch (error) {
    logger.error("Error running query:", error);
    throw error;
  }
}
