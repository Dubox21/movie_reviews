/* 
El archivo movieModel.js define funciones para interactuar con la base de datos. 
Estas funciones encapsulan las consultas SQL y devuelven los resultados. Esto hace que el código sea más limpio y reutilizable.


Interactúan directamente con la base de datos.
*/ 


import db from '../config/db.js';

export const insertMovie = (movieData, callback) => {
    const {
        title, genre_id, description, trailer, director, screenwriter,
        country, language, duration, premiere, rating, imageCover, imageBanner
    } = movieData;

    const sql = `INSERT INTO movies (title, genre_id, description, trailer, director, screenwriter, country, language, duration, premiere, rating, image_cover, image_banner) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        title, genre_id, description, trailer, director, screenwriter,
        country, language, duration, premiere, rating, imageCover, imageBanner
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar película:', err);
            callback(err, null);
        } else {
            console.log('Película añadida correctamente.');
            callback(null, result);
        }
    });
};

export const fetchMovieDetails = (title, callback) => {
    const sql = `SELECT * FROM movies M JOIN genres g ON m.genre_id = g.id WHERE title = ?`;
    db.query(sql, [title], (err, result) => {
        if (err) {
            console.error('Error al obtener detalles de la película desde la base de datos:', err);
            callback(err, null);
        } else {
            callback(null, result[0]); // Devuelve solo el primer resultado (asumiendo que el título es único)
        }
    });
};