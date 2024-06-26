// routes/userRoutes.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nombre, correo_electronico, contrasena } = req.body;
    try {
        const sql = 'INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)';
        const connection = await db.getConnection();
        console.log(connection.connection)
        const [result] = await connection.query(sql, [nombre, correo_electronico, contrasena]);
        connection.release();
        console.log('Usuario registrado:', result);
        res.send('Registro exitoso');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
});

export default router;