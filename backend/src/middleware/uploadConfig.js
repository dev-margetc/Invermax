//Middleware para subir archivos, tambien se encarga de eliminarlos

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Inicialmente se hace la Función de filtrado para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
    // Obtiene los límites de tamaño desde el entorno o usa valores por defecto
    const maxImageSize = parseInt(process.env.MAX_IMAGE_SIZE) || 5 * 1024 * 1024; // 5 MB por defecto
    const maxVideoSize = parseInt(process.env.MAX_VIDEO_SIZE) || 20 * 1024 * 1024; // 20 MB por defecto

    // Verifica si el archivo es una imagen o un video
    if (file.mimetype.startsWith('image/')) {
        if (file.size > maxImageSize) {
            return cb(new multer.MulterError(`El tamaño de la imagen excede el límite de ${maxImageSize / (1024 * 1024)} MB`), false);
        }
        cb(null, true); // Permite el archivo si es una imagen y cumple con el tamaño

    } else if (file.mimetype.startsWith('video/')) {
        if (file.size > maxVideoSize) {
            return cb(new multer.MulterError(`El tamaño del video excede el límite de ${maxVideoSize / (1024 * 1024)} MB`), false);
        }
        cb(null, true); // Permite el archivo si es un video
    } else {
        cb(new multer.MulterError('Solo se permiten imágenes o videos'), false); // Rechaza el archivo
    }
};


// Función que determina la carpeta de destino
const setDestination = (tipoModulo, tipoArchivo) => {
    // Define la carpeta base según el tipo de módulo
    let ruta = process.env.UPLOADS_PATH;
    let baseFolder = ruta + `/${tipoModulo}`; // e.g., 'uploads/blogs' o 'uploads/inmuebles'

    // Agrega subcarpetas según el tipo de archivo
    if (tipoArchivo === 'foto') {
        return `${baseFolder}/fotos`;
    } else if (tipoArchivo === 'video') {
        return `${baseFolder}/videos`;
    } else {
        return `${baseFolder}/otros`; // Carpeta por defecto
    }
};

// Funcion que determina el nombre del archivo
const setNombre = (params) => {
    let nombre = "NN";
    const { idDetalle, idBlog, idCustomer } = params
    if (idDetalle) {
        nombre = `detalle-${idDetalle}`;
    } else if (idBlog) {
        nombre = `blog-${idBlog}`;
    } else if (idCustomer) {
        nombre = `customer-${idCustomer}`;
    }

    // Agregar sufijo único con fecha y número aleatorio
    const uniqueSuffix = `-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    nombre += uniqueSuffix;  // Concatenar al final

    return nombre;
}

// Determinar el tipo de archivo
const getTipo = (mimetype) => {
    if (mimetype.startsWith('image/')) {
        return 'foto';
    } else if (mimetype.startsWith('video/')) {
        return 'video';
    } else {
        return 'otros'; // Si no es ni imagen ni video, se clasifica como 'otros'
    }
}
// Configuración de Multer con validación de tipo de archivo. GUARDA EN DISCO
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tipoModulo = req.body.tipoModulo;
        if (!tipoModulo) {
            return cb(new multer.MulterError('Falta módulo en la solicitud.'), false);
        }
        // Determina el tipo de archivo automáticamente desde el mimetype
        let tipoArchivo = getTipo(file.mimetype);

        // Asigna tipoArchivo al objeto file para que esté disponible en el controlador
        file.tipoArchivo = tipoArchivo;

        // Obtener el archivo de destino    
        const destination = setDestination(tipoModulo, tipoArchivo);
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const nombreArchivo = setNombre(req.params);
        const ext = path.extname(file.originalname); // Extensión del archivo
        cb(null, `${nombreArchivo}${ext}`); // Nombre del archivo único
    }
});

// Middleware de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


/* Función para eliminar archivos del servidor*/

// Eliminar multimedia del servidor. Tiene en cuenta si el nombre de la BD incluye la ruta

// El tipo es 'fotos' o 'videos'
const deleteMultimediaServidor = async (tipo, nombre, modulo) => {
    try {

        // Si el nombre incluye la ruta completa, no se utiliza la ruta base

        let ruta = nombre.includes("C:") ? nombre : path.join(process.env.UPLOADS_PATH, modulo, tipo, nombre);

        if (fs.existsSync(ruta)) {
            fs.unlink(ruta, (err) => {
                if (err) {
                    throw new ErrorNegocio("Error inesperado buscando ruta de multimedia");
                } else {
                    return "Multimedia eliminada";
                }
            });
        } else {
            console.log("Ruta de multimedia no encontrada");
        }

    } catch (error) {
        throw error;
    }
}
module.exports = {upload,deleteMultimediaServidor};