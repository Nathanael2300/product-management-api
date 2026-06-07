import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../database/database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log(err.message);
  }
});

console.log("Database path:", dbPath);
console.log("Database initialized");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL
    )
  `);
});
export default db;
