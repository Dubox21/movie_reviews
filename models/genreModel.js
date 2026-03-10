import db from '../config/db.js';

export const fetchGenres = (callback) => {
    const sql = 'SELECT id, name FROM genres';

    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};
