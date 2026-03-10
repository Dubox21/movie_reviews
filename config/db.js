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

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path absoluto a movie.db
const sqlitePath = path.join(__dirname, '../movie.db'); // ajustar según la ubicación real

const db = new sqlite3.Database(sqlitePath, (err) => {
  if (err) console.error("Error conectando a la base:", err.message);
  else console.log("Conectado a SQLite:", sqlitePath);
});

export default db;
