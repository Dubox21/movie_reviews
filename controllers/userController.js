import { insertUser } from '../models/userModel.js';

export const registerUser = async (req, res) => {
    const { nombre, correo_electronico, contrasena } = req.body;
    try {
        const result = await insertUser(nombre, correo_electronico, contrasena);
        console.log('Usuario registrado:', result);
        res.send('Registro exitoso');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al registrar el usuario');
    }
};