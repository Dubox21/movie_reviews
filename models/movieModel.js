import db from '../config/db.js';

export const insertMovie = (movieData, callback) => {
    const {
        title, genre_id, description, trailer, director, screenwriter,
        country_id, language, duration, premiere, rating, imageCover, imageBanner
    } = movieData;

    const sql = `INSERT INTO movies (title, genre_id, description, trailer, director, screenwriter, country_id, language, duration, premiere, rating, image_cover, image_banner) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        title, genre_id, description, trailer, director, screenwriter,
        country_id, language, duration, premiere, rating, imageCover, imageBanner
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
  

export const fetchMovieDetails = (title, callback) => {
    const sql = `SELECT * FROM movies M JOIN genres g ON m.genre_id = g.id JOIN countries c ON m.country_id = c.id WHERE title = ?`;
    db.query(sql, [title], (err, result) => {
        if (err) {
            console.error('Error al obtener detalles de la película desde la base de datos:', err);
            callback(err, null);
        } else {
            
            callback(null, result[0]); // Devuelve solo el primer resultado (asumiendo que el título es único)
        }
    });
};

export const searchMovie = (title, callback) => {
    const sql = 'SELECT * FROM movies M JOIN genres g ON m.genre_id = g.id JOIN countries c ON m.country_id = c.id WHERE title LIKE ?';
    const values = [`%${title}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};