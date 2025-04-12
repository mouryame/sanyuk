import { queries } from "../db/queries";
import sqlite3 from "sqlite3";

async function createAllTables(db: sqlite3.Database) {
  await db.serialize(async () => {
    await db.run(queries.createUsersTable);
    await db.run(queries.createPagesTable);
  });
}

export default createAllTables;
