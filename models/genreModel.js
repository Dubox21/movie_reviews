import db from '../config/db.js';

export const fetchGenres = (callback) => {
    const sql = 'SELECT id, name FROM genres';
    db.query(sql, callback);
};
