// scripts/generateJson.js
import sqlite3 from "sqlite3";
import fs from "fs";

const db = new sqlite3.Database("./movie.db");

db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';", (err, tables) => {
  if (err) throw err;

  let pending = tables.length;
  const dbData = {};

  tables.forEach(({ name }) => {
    db.all(`SELECT * FROM ${name}`, (err, rows) => {
      if (err) throw err;

      dbData[name] = rows;
      pending--;
      if (pending === 0) {
        fs.writeFileSync("movies.json", JSON.stringify(dbData, null, 2));
        console.log("JSON completo generado listo para producción");
        db.close();
      }
    });
  });
});
