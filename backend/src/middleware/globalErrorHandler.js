// Maneja errores  que pueden no haber sido definidos y usados por el middleware
const { handleControllerError } = require('../utils/ErrorHandler');
const multer = require('multer');

const globalErrorHandler = (err, req, res, next) => {
    // Si es un error de Multer
    if (err instanceof multer.MulterError) {
        return res.status(400).json({error:{ message: 'Error en la carga del archivo. Verifique el tipo de archivo y el tamaño.' }});
    }

    // Si el error es de Sequelize, maneja usando ErrorHandler basico
    if (err.name && err.errors) {
        return handleControllerError(res, err, null); // Se usarian los mensajes genericos
    }

    // Mensaje genérico para otros errores
    return res.status(500).json({error:{ message: 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.' }});
};

module.exports = globalErrorHandler;
