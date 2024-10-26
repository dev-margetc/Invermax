//Middleware para subir archivos

const multer = require('multer');
const path = require('path');
const express = require("express");


// Función que determina la carpeta de destino
const setDestination = (tipoModulo, tipoArchivo) => {
    // Define la carpeta base según el tipo de módulo
    let ruta = process.env.UPLOADS_PATH;
    let baseFolder = ruta+`/uploads/${tipoModulo}`; // e.g., 'uploads/blogs' o 'uploads/inmuebles'
    
    // Agrega subcarpetas según el tipo de archivo
    if (tipoArchivo === 'foto') {
        return `${baseFolder}/fotos`;
    } else if (tipoArchivo === 'video') {
        return `${baseFolder}/videos`;
    } else {
        return `${baseFolder}/otros`; // Carpeta por defecto
    }
};

// Función de filtrado para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
    // Verifica si el archivo es una imagen o un video
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Permite el archivo si es una imagen
    } else if (file.mimetype.startsWith('video/')) {
        cb(null, true); // Permite el archivo si es un video
    } else {
        cb(new Error('Solo se permiten imágenes o videos'), false); // Rechaza el archivo
    }
};

// Configuración de Multer con validación de tipo de archivo. GUARDA EN DISCO
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tipoModulo = req.body.tipoModulo;
        const tipoArchivo = req.body.tipoArchivo;

        const destination = setDestination(tipoModulo, tipoArchivo);
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        const productId = req.body.idDetalle; // Obtiene el ID del detalleInmueble
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Sufijo único para asegurar que no se repita el nombre en la BD
        const ext = path.extname(file.originalname); // Extensión del archivo
        cb(null, `${productId}-${uniqueSuffix}${ext}`); // Nombre del archivo único
    }
});

// Middleware de Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;