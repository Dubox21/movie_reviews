import 'dotenv/config';
import mysql from 'mysql2';

const db = mysql.createConnection({
    //host: process.env.MYSQL_ADDON_HOST,
    //user: process.env.MYSQL_ADDON_USER,
    //password: process.env.MYSQL_ADDON_PASSWORD,
    //database: process.env.MYSQL_ADDON_DB
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'movies_reviews'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con la base de datos.');
});

export default db;