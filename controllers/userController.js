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
    const email = req.body.email;
    const password = req.body.password;

    console.log('Datos recibidos del cliente:', { email, password });

    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Complete todos los campos" });
    }

    try {
        const usuario = await getUser(email);

        console.log('Usuario encontrado en la base de datos:', usuario);
        if (!usuario || usuario.length === 0 || usuario[0].contrasena !== password) {
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