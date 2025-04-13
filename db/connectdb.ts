import sqlite3 from "sqlite3";
import createAllTables from "@/services/createAllTables";
import logger from "@/utils/logger";

export default function connect(): sqlite3.Database {
  const db = new sqlite3.Database("db/database.db", (err) => {
    if (err) {
      logger.error("Could not connect to database", err);
    } else {
      logger.log("Connected to SQLite database");
      createAllTables(db);
    }
  });

  return db;
}
