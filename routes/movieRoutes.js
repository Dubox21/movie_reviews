import express from 'express';
import { addMovie, modifyMovie, getMovieDetails, getMovieSearch, getMoviesByGenre, deleteMovieByTitle } from '../controllers/movieController.js';
import upload from '../middlewares/multerConfig.js';


const router = express.Router();

// Ruta para agregar una película
router.post('/add', upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'imageBanner', maxCount: 1 }]), addMovie);

// Ruta para modificar una pelicula por su titulo
router.put('/modify/:title', upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'imageBanner', maxCount: 1 }]), modifyMovie);

// Ruta para obtener los detalles de una pelicula
router.get('/:title', getMovieDetails);

// Ruta para mostrar la página de detalles de la película
router.get('/movie/:title', getMovieDetails);

// Ruta para buscar películas por título parcial
router.get('/search/:title', getMovieSearch);

// Ruta para obtener películas por género
router.get('/genre/:genreId', getMoviesByGenre);

// Ruta para eliminar una películas
router.delete('/delete/:title',deleteMovieByTitle);

export default router;
