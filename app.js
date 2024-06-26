import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
// import config from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Obtener __filename y __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar datos JSON y datos de formulario
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para datos de formulario

app.use('/api/users', userRoutes); // Usar el enrutador importado

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

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formulario.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formMovie.html'));
});

app.get('/formRegistro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Pages/formRegistro.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
});
