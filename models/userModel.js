import db from '../config/db.js';

export const insertUser = (nombre, correo_electronico, contrasena) => {

    const sql =
        'INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {

        db.run(sql,
            [nombre, correo_electronico, contrasena],
            function (err) {

                if (err) reject(err);
                else resolve(this.lastID);

            });

    });
};

export const getUser = (correo_electronico, contrasena) => {

    const sql =
        "SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?";

    return new Promise((resolve, reject) => {

        db.get(sql,
            [correo_electronico, contrasena],
            (err, row) => {

                if (err) reject(err);
                else resolve(row);

            });

    });
};
