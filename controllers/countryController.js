import { fetchCountry } from '../models/countryModel.js';

export const getCountry = (req, res) => {
    fetchCountry((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};
