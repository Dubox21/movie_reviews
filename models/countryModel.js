import db from '../config/db.js';

export const fetchCountry = (callback) => {
    const sql = 'SELECT id, country FROM countries';

    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};
