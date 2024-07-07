import { insertUser } from '../models/userModel.js';
import {getUser} from '../models/userModel.js';

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


export const loginUser = async (req, res) =>{
    console.log(req.body);
    const correo_electronico = req.body.correo_electronico;
    const contrasena = req.body.contrasena;

    console.log('Datos recibidos del cliente:', { correo_electronico, contrasena });

    if (!correo_electronico || !contrasena) {
        return res.status(400).send({ status: "Error", message: "Complete todos los campos" });
    }

    try {
        const usuario = await getUser(correo_electronico, contrasena);

        console.log('Usuario encontrado en la base de datos:', usuario);
        if (!usuario || usuario.length === 0 || usuario[0].contrasena !== contrasena) {
            return res.status(401).send('Credenciales inválidas');
        }

       /* if (!usuario || usuario.contrasena !== password) {
            return res.status(401).send('Credenciales inválidas');
        }*/

        console.log('Usuario logueado:', usuario);
        res.json({ redirect: '/home' });
    } catch (error) {
        console.error('Error al loguear el usuario:', error);
        res.status(500).send('Error al loguear el usuario');
    }
/*
    try {
        const result = await getUser(email, password);
        console.log('Usuario logueado:', result);
        res.send('Sign in exitoso');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).send('Error al loguear el usuario');
    }
*/
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).json({ error: 'Error al cerrar sesión' });
        } else {
            res.status(200).json({ message: 'Sesión cerrada correctamente' });
        }
    });
};