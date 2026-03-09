import 'dotenv/config';
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
   password: '',
   database: 'movie_reviews'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con la base de datos.');
});

export default db;

// import 'dotenv/config';
// import pkg from 'pg';
// const { Pool } = pkg;

// // Configurar la conexión usando la variable de entorno
// const pool = new Pool({
//     connectionString: process.env.DATABASE,
//     ssl: { rejectUnauthorized: false },
// });

// // Probar la conexión
// pool.connect(err => {
//     if (err) {
//         console.error('Error al conectar con PostgreSQL:', err);
//         return;
//     }
//     console.log('Conexión establecida con PostgreSQL.');
// });

// // Exportar pool
// export default pool;
