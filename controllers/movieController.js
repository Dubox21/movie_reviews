import { insertMovie, fetchMovieDetails, updateMovie, searchMovie, fetchMoviesByGenre } from '../models/movieModel.js';

// Controlador para agregar una nueva película
export const addMovie = (req, res) => {

    const { title, genre_id, description, trailer, director, screenwriter, country_id, language, duration, premiere, rating } = req.body;

    const imageCover = req.files['imageCover'][0].originalname;
    const imageBanner = req.files['imageBanner'][0].originalname;

    insertMovie({
        title,
        genre_id,
        description,
        trailer,
        director,
        screenwriter,
        country_id,
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
            res.status(200).redirect('/success');
        }
    });
};

// Controlador para modificar una pelicula
export const modifyMovie = async (req, res) => {
     const title = decodeURIComponent(req.params.title);

     searchMovie(title, (err, currentMovie) => {
         if (err) {
             console.error('Error al obtener detalles de la película:', err);
             res.status(500).json({ error: 'Error al obtener detalles de la película' });
         } else if (!currentMovie) {
             console.log(`Película no encontrada: ${title}`);
             res.status(404).json({ error: 'Película no encontrada' });
         } else {
             const updatedMovieData = {
                 title: req.body.title || currentMovie.title,
                 genre_id: req.body.genre_id || currentMovie.genre_id,
                 description: req.body.description || currentMovie.description,
                 trailer: req.body.trailer || currentMovie.trailer,
                 director: req.body.director || currentMovie.director,
                 screenwriter: req.body.screenwriter || currentMovie.screenwriter,
                 country_id: req.body.country_id || currentMovie.country_id,
                 language: req.body.language || currentMovie.language,
                 duration: req.body.duration || currentMovie.duration,
                 premiere: req.body.premiere || currentMovie.premiere,
                 rating: req.body.rating || currentMovie.rating,
                 image_cover: req.files['imageCover'] ? req.files['imageCover'][0].originalname : currentMovie.image_cover,
                 image_banner: req.files['imageBanner'] ? req.files['imageBanner'][0].originalname : currentMovie.image_banner
             };

             updateMovie(title, updatedMovieData, (err, result) => {
                 if (err) {
                     console.error('Error al actualizar la película:', err);
                     res.status(500).json({ error: 'Error al actualizar la película' });
                 } else {
                     res.status(200).json({ message: 'Película actualizada correctamente' });
        
                 }
             });
         }
     });
};

// Controlador para obtener los detalles de una pelicula
export const getMovieDetails = (req, res) => {
    const title = decodeURIComponent(req.params.title);

    fetchMovieDetails(title, (err, movie) => {
        if (err) {
            console.error('Error al obtener detalles de la película:', err);
            return res.status(500).json({ error: 'Error al obtener detalles de la película' });
        }

        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }

        // Verificar y asignar valores por defecto para las imágenes
        movie.imageCover = movie.image_cover || 'default_cover.jpg';
        movie.imageBanner = movie.image_banner || 'default_banner.jpg';

        res.status(200).json(movie);
    });
};

// Controlador para buscar una pelicula por coincidencias
export const getMovieSearch = (req, res) => {
    const title = decodeURIComponent(req.params.title);

    searchMovie(title, (err, movies) => {
        if (err) {
            console.error('Error al buscar películas:', err);
            res.status(500).json({ error: 'Error al buscar películas' });
        } else if (!movies || movies.length === 0) {
            res.status(404).json({ error: 'Película no encontrada' });
        } else {
            res.status(200).json(movies);
        }
    });
};

// Controlador para obtener películas por género
export const getMoviesByGenre = (req, res) => {
    const { genreId } = req.params;

    fetchMoviesByGenre(genreId, (err, movies) => {
        if (err) {
            console.error('Error al obtener películas por género:', err);
            res.status(500).json({ error: 'Error al obtener películas por género' });
        } else {
            res.status(200).json(movies);
        }
    });
};