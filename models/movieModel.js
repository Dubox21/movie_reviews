import db from '../config/db.js';

// Función para insertar una dirección en la base de datos
export const insertMovie = (movieData, callback) => {
    const {
        title, genre_id, description, trailer, director, screenwriter,
        country_id, language, duration, premiere, rating, imageCover, imageBanner
    } = movieData;

    const imageCoverFileName = imageCover ? imageCover.split('/').pop() : null;
    const imageBannerFileName = imageBanner ? imageBanner.split('/').pop() : null;

    const sql = `INSERT INTO movies 
    (title, genre_id, description, trailer, director, screenwriter, country_id, language, duration, premiere, rating, image_cover, image_banner) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        title, genre_id, description, trailer, director, screenwriter,
        country_id, language, duration, premiere, rating,
        imageCoverFileName, imageBannerFileName
    ];

    db.run(sql, values, function (err) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, { id: this.lastID });
        }
    });
};

// Función para actualizar una película en la base de datos
export const updateMovie = (title, updatedMovieData, callback) => {

    const fieldsToUpdate = Object.entries(updatedMovieData)
        .filter(([_, value]) => value !== undefined && value !== null);

    const sql = `UPDATE movies 
        SET ${fieldsToUpdate.map(([field]) => `${field} = ?`).join(', ')}
        WHERE title = ?`;

    const values = [
        ...fieldsToUpdate.map(([_, value]) => value),
        title
    ];

    db.run(sql, values, function (err) {
        if (err) {
            callback(err, null);
        } else if (this.changes === 0) {
            callback(new Error("No se encontró la película"), null);
        } else {
            callback(null, true);
        }
    });
};

// Función para obtener los detalles de una pelicula desde la base de datos
export const fetchMovieDetails = (title, callback) => {

    const sql = `
    SELECT M.*, g.name as genre_name, c.country as country_name
    FROM movies M
    JOIN genres g ON M.genre_id = g.id
    JOIN countries c ON M.country_id = c.id
    WHERE title = ?
    `;

    db.get(sql, [title], (err, row) => {
        if (err) {
            callback(err, null);
        } else if (!row) {
            callback(new Error("No encontrada"), null);
        } else {
            callback(null, row);
        }
    });
};

// Función para obtener las películas por genero
export const fetchMoviesByGenre = (genreId, callback) => {

    const sql = `
    SELECT M.*, g.name as genre_name, c.country as country_name
    FROM movies M
    JOIN genres g ON M.genre_id = g.id
    JOIN countries c ON M.country_id = c.id
    WHERE genre_id = ?
    `;

    db.all(sql, [genreId], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Función para buscar películas por titulo parcial
export const searchMovie = (title, callback) => {

    const sql = `
    SELECT M.*, g.name as genre_name, c.country as country_name
    FROM movies M
    JOIN genres g ON M.genre_id = g.id
    JOIN countries c ON M.country_id = c.id
    WHERE M.title LIKE ?
    `;

    db.all(sql, [`%${title}%`], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Función para eliminar películas
export const deleteMovie = (title, callback) => {

    const sql = `DELETE FROM movies WHERE title = ?`;

    db.run(sql, [title], function (err) {
        if (err) {
            callback(err, null);
        } else if (this.changes === 0) {
            callback(new Error("No encontrada"), null);
        } else {
            callback(null, true);
        }
    });
};
