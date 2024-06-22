import express from 'express';
import { addMovie, getMovieDetails } from '../controllers/movieController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nombre original del archivo
    }
});

const upload = multer({ storage: storage });

// Ruta para agregar una película
router.post('/add', upload.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'imageBanner', maxCount: 1 }]), addMovie);

router.get('/:title', getMovieDetails);

// Ruta para mostrar la página de detalles de la película
router.get('/movie/:title', getMovieDetails);

export default router;
