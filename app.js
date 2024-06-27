import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import countryRoutes from './routes/countryRoutes.js';
import allMovieRoutes from './routes/allMovieRoutes.js';


// Obtener __filename y __dirname en un módulo ES
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const SECRET_KEY = process.env.SECRET_KEY
const port = process.env.PORT || 3000;

// Middleware para procesar datos JSON y datos de formulario
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para datos de formulario

app.use('/api/users', userRoutes);

//Routes
app.use('/api/genres', genreRoutes);
app.use('/api/countries', countryRoutes);

app.use('/api/movies', movieRoutes);
app.use('/api/allMovies', allMovieRoutes);

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

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages', 'success.html'));
});

app.get('/movies', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages', 'movie.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formulario.html'));
});

//Public files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.get('/formRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formRegistro.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});
