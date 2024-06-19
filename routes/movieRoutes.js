/*
Definen los endpoints y utilizan los controladores para manejar las solicitudes.

*/

import express from 'express';
const router = express.Router();

// Ejemplo de rutas
router.get('/', (req, res) => {
    res.send('Obteniendo todas las películas');
});

router.post('/', (req, res) => {
    res.send('Creando una nueva película');
});

// Exportar el router como exportación por defecto
export default router;
