import express from 'express';
import { getAllMovies } from '../controllers/allMovieController.js';

const router = express.Router();

router.get('/', getAllMovies);

export default router;
