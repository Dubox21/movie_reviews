import db from '../config/db.js';

export const fetchGenres = (callback) => {
    const sql = 'SELECT id, name FROM genres';
    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};
