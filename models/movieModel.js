import db from '../config/db.js';

// Función para insertar una dirección en la base de datos
export const insertMovie = (movieData, callback) => {
    const {
        title, genre_id, description, trailer, director, screenwriter,
        country_id, language, duration, premiere, rating, imageCover, imageBanner
    } = movieData;

    const imageCoverFileName = imageCover ? imageCover.split('/').pop() : null;
    const imageBannerFileName = imageBanner ? imageBanner.split('/').pop() : null;

    const sql = `INSERT INTO movies (title, genre_id, description, trailer, director, screenwriter, country_id, language, duration, premiere, rating, image_cover, image_banner) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        title, genre_id, description, trailer, director, screenwriter,
        country_id, language, duration, premiere, rating, imageCoverFileName, imageBannerFileName
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

// Función para actualizar una película en la base de datos
export const updateMovie = (title, updatedMovieData, callback) => {
    // Filtrar los campos que tienen un valor definido
    const fieldsToUpdate = Object.entries(updatedMovieData).filter(([_, value]) => value !== undefined && value !== null);

    // Construir la consulta SQL con solo los campos a actualizar
    const sql = `UPDATE movies SET ${fieldsToUpdate.map(([field]) => `\`${field}\` = ?`).join(', ')} WHERE title = ?`;
    const values = [...fieldsToUpdate.map(([_, value]) => value), title];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar la película:', err);
            callback(err, null);
        } else {
            if (result.affectedRows === 0) {
                callback(new Error('No se encontró la película a actualizar'), null);
            } else {
                console.log('Película actualizada correctamente.');
                callback(null, result);
            }
        }
    });
};

// Función para obtener los detalles de una pelicula desde la base de datos
export const fetchMovieDetails = (title, callback) => {
    const sql = `SELECT M.*, g.name as genre_name, c.country as country_name
     FROM movies M 
     JOIN genres g ON M.genre_id = g.id 
     JOIN countries c ON M.country_id = c.id 
     WHERE title = ?`;
    db.query(sql, [title], (err, result) => {
        if (err) {
            console.error('Error al obtener detalles de la película desde la base de datos:', err);
            callback(err, null);
        } else {
            if (result.length === 0) {
                callback(new Error('Película no encontrada'), null);
            } else {
                callback(null, result[0]);
            }
        }

    });
};

// Función para obtener las películas por genero
export const fetchMoviesByGenre = (genreId, callback) => {
    const sql = `SELECT M.*, g.name as genre_name, c.country as country_name
     FROM movies M 
     JOIN genres g ON M.genre_id = g.id 
     JOIN countries c ON M.country_id = c.id 
     WHERE genre_id = ?`;
    db.query(sql, [genreId], (err, result) => {
        if (err) {
            console.error('Error al obtener películas por género:', err);
            callback(err, null);
        } else {
            if (result.length === 0) {
                callback(new Error('No se encontraron películas para este género'), null);
            } else {
                callback(null, result);
            }
        }
    });
};

// Función para buscar películas por titulo parcial
export const searchMovie = (title, callback) => {
    const sql = `SELECT M.*, g.name as genre_name, c.country as country_name 
    FROM movies M 
    JOIN genres g ON M.genre_id = g.id 
    JOIN countries c ON M.country_id = c.id 
    WHERE M.title LIKE ?`;
    const values = [`%${title}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};


// Función para eliminar películas
export const deleteMovie = (title, callback) => {
    const sql = `DELETE FROM movies M 
    WHERE M.title = ?`;

    db.query(sql, [title], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            console.log('Película eliminada correctamente.')
            callback(null, results);
        }
    });
};
