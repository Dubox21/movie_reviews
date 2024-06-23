import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movieRoutes from './routes/movieRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import countryRoutes from './routes/countryRoutes.js';
import multer from 'multer';

// Obtener __filename y __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/genres', genreRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/movies', movieRoutes);

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/Acerca-de-nosotros.html'));
});

app.get('/library', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/library.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formMovie.html'));
});

app.get('/movies', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages', 'movie.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formulario.html'));
});


// Inicia el servidor
app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});
