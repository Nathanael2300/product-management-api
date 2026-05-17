import sqlite3 from "sqlite3";

sqlite3.verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
    return;
  }

  console.log("Connected to SQLite database.");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      category TEXT,
      stock INTEGER
    )
  `);
});

export default db;
