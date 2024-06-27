import db from '../config/db.js'; // Asegúrate de la ruta correcta

export const insertUser = (nombre, correo_electronico, contrasena) => {
    const sql = 'INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [nombre, correo_electronico, contrasena], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};