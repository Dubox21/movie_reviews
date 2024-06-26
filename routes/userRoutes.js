import express from 'express';
import db from '../config/db.js'; // Asegúrate de la ruta correcta

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nombre, correo_electronico, contrasena } = req.body;
    try {
        const sql = 'INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)';
        db.query(sql, [nombre, correo_electronico, contrasena], (err, result) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                res.status(500).send('Error al registrar el usuario');
                return;
            }
            console.log('Usuario registrado:', result);
            res.send('Registro exitoso');
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});

export default router;