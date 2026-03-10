// import 'dotenv/config';
// import mysql from 'mysql2';

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//    password: '',
//    database: 'movie_reviews'
// });

// db.connect(err => {
//     if (err) {
//         console.error('Error al conectar con la base de datos:', err);
//         return;
//     }
//     console.log('Conexión establecida con la base de datos.');
// });

// export default db;

// // import 'dotenv/config';
// // import pkg from 'pg';
// // const { Pool } = pkg;

// // // Configurar la conexión usando la variable de entorno
// // const pool = new Pool({
// //     connectionString: process.env.DATABASE,
// //     ssl: { rejectUnauthorized: false },
// // });

// // // Probar la conexión
// // pool.connect(err => {
// //     if (err) {
// //         console.error('Error al conectar con PostgreSQL:', err);
// //         return;
// //     }
// //     console.log('Conexión establecida con PostgreSQL.');
// // });

// // // Exportar pool
// // export default pool;

import sqlite3 from "sqlite3";
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detectar producción
const isProd = process.env.NODE_ENV === 'production';

// Rutas
const sqlitePath = path.join(__dirname, '../movie.db'); // tu SQLite local
const jsonPath = path.join(__dirname, 'movies.json'); // JSON para prod

let db;

if (isProd) {
  // ------------------- Producción -------------------
  let dbData = {};

  // Si el JSON ya existe, lo cargamos
  if (fs.existsSync(jsonPath)) {
    dbData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log('DB cargada desde JSON en producción');
  } else {
    // Intentamos generar JSON desde SQLite
    try {
      const sqliteDb = new sqlite3.Database(sqlitePath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.error('No se pudo abrir SQLite en producción:', err.message);
        }
      });

      // Obtener todas las tablas
      sqliteDb.all(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
        (err, tables) => {
          if (err) throw err;

          let pending = tables.length;

          tables.forEach(({ name }) => {
            sqliteDb.all(`SELECT * FROM ${name}`, (err, rows) => {
              if (err) throw err;

              dbData[name] = rows;
              pending--;

              if (pending === 0) {
                fs.writeFileSync(jsonPath, JSON.stringify(dbData, null, 2));
                console.log('JSON generado desde todas las tablas');
                sqliteDb.close();
              }
            });
          });
        }
      );

    } catch (err) {
      console.error('No se pudo generar JSON desde SQLite:', err.message);
    }
  }

  // Exportamos un objeto con .all() compatible con tus modelos
  db = {
    all: (query, callback) => {
      const match = query.match(/FROM (\w+)/i);
      if (match) {
        const table = match[1];
        callback(null, dbData[table] || []);
      } else {
        callback(null, []);
      }
    }
  };

} else {
  // ------------------- Local -------------------
  db = new sqlite3.Database(sqlitePath, (err) => {
    if (err) {
      console.error("Error conectando a la base:", err.message);
    } else {
      console.log("Conectado a SQLite");
    }
  });
}

export default db;

