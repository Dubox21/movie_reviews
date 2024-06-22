/*
El archivo movieController.js contiene la lógica de negocio y se comunica con el modelo (movieModel). 
Los controladores reciben las solicitudes HTTP, llaman a los métodos del modelo y envían las respuestas correspondientes.

Contienen la lógica de negocio y manipulan los modelos.
*/

import { insertMovie, fetchMovieDetails } from '../models/movieModel.js';

// Controlador para agregar una nueva película
export const addMovie = (req, res) => {

    const { title, genre_id, description, trailer, director, screenwriter, country, language, duration, premiere, rating } = req.body;

    const imageCover = req.files['imageCover'][0].path;
    const imageBanner = req.files['imageBanner'][0].path;

    insertMovie({
        title,
        genre_id,
        description,
        trailer,
        director,
        screenwriter,
        country,
        language,
        duration,
        premiere,
        rating,
        imageCover,    // Pasar la ruta del archivo de imagen de portada
        imageBanner    // Pasar la ruta del archivo de imagen de banner
    }, (err, result) => {
        if (err) {
            console.error('Error al insertar película:', err);
            res.status(500).send('Error al guardar la película en la base de datos.');
        } else {
            console.log('Película añadida correctamente.');
            res.status(200).send('Película añadida correctamente.');
        }
    });
};

export const getMovieDetails = (req, res) => {
    const title = decodeURIComponent(req.params.title);

    fetchMovieDetails(title, (err, movie) => {
        if (err) {
            console.error('Error al obtener detalles de la película:', err);
            res.status(500).json({ error: 'Error al obtener detalles de la película' });
        } else {
            movie.imageCoverUrl = movie.image_cover;
            movie.imageBanner = movie.image_banner;
            res.status(200).json(movie);
        }
    });
};

