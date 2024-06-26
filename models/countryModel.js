import db from '../config/db.js';

export const fetchCountry = (callback) => {
    const sql = 'SELECT id, country FROM countries';
    db.query(sql, callback);
};
