import db from '../config/db.js';

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


export const getUser = function (correo_electronico, contrasena) {
    const sql = "SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [correo_electronico, contrasena], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

/*
export const getUser = function (nombre, contrasena) {
    const sql = "SELECT * FROM usuarios WHERE nombre ='" + nombre + "' AND contrasena ='" + contrasena + "'" ;
    return new Promise((resolve, reject) => {
        db.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};*/