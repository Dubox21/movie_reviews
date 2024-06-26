import { fetchGenres } from '../models/genreModel.js';

export const getGenres = (req, res) => {
    fetchGenres((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};
