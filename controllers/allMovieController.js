import { fetchAllMovies } from '../models/allMovieModel.js';

export const getAllMovies = (req, res) => {
    fetchAllMovies((err, movies) => {
        if (err) {
            console.error('Error al obtener todas las películas:', err);
            res.status(500).json({ error: 'Error al obtener todas las películas' });
        } else {
            if (movies && movies.length > 0) {
                res.status(200).json(movies);
            } else {
                res.status(404).json({ error: 'No se encontraron películas' });
            }
        }
    });
};

