import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nombre original del archivo
    }
});


// Filtro de archivos para asegurar que solo se acepten imágenes
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Archivo debe ser una imagen válida');
    }
};

// Inicialización de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;
