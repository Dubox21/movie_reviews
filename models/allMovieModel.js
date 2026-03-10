import db from '../config/db.js';

export const fetchAllMovies = (callback) => {
    const sql = 'SELECT * FROM movies';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error al obtener todas las películas desde la base de datos:', err);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};
