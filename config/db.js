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

// db.js
import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import 'dotenv/config';
import { fileURLToPath } from "url";

// Convierte import.meta.url en __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detectar producción
const isProd = process.env.NODE_ENV === 'production';

// Rutas
const sqlitePath = path.join(__dirname, '../movie.db'); // SQLite local
const jsonPath = path.join(__dirname, 'movies.json');   // JSON para producción

let db;

if (isProd) {
  // ------------------- Producción -------------------
  if (!fs.existsSync(jsonPath)) {
    console.error('No se encontró movies.json en producción. Subilo al proyecto.');
    db = { all: (query, cb) => cb(null, []) }; // fallback vacío
  } else {
    const dbData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log('DB cargada desde JSON en producción');

    // Creamos un objeto que simula .all() de SQLite
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
  }

} else {
  // ------------------- Local -------------------
  db = new sqlite3.Database(sqlitePath, (err) => {
    if (err) {
      console.error("Error conectando a SQLite local:", err.message);
    } else {
      console.log("Conectado a SQLite local");
    }
  });
}

export default db;
