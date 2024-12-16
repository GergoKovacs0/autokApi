import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.db");

const initializeDB = async () => {
  await db.run(
    "CREATE TABLE IF NOT EXISTS cars (  id INTEGER PRIMARY KEY AUTOINCREMENT,brand TEXT,model TEXT,color TEXT,year INTEGER)"
  );
};

const dbQuerry = async (query, values) => {
  return new Promise((resolve, reject) => {
    db.all(query, values, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const dbRun = async (query, values = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};
export default db;
