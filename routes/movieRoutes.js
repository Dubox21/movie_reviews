import express from 'express';
import { addMovie, modifyMovie, getMovieDetails, getMovieSearch } from '../controllers/movieController.js';
import upload from '../middlewares/multerConfig.js';

const router = express.Router();

// Ruta para agregar una película
router.post('/add', upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'imageBanner', maxCount: 1 }]), addMovie);
router.put('/modify/:title', upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'imageBanner', maxCount: 1 }]), modifyMovie);

router.get('/:title', getMovieDetails);

// Ruta para mostrar la página de detalles de la película
router.get('/movie/:title', getMovieDetails);

// Ruta para buscar películas por título parcial
router.get('/search/:title', getMovieSearch);

export default router;
