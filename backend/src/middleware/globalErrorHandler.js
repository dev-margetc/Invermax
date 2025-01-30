// Maneja errores  que pueden no haber sido definidos y usados por el middleware
const { handleControllerError } = require('../utils/ErrorHandler');
const multer = require('multer');
const ErrorNegocio = require('../utils/errores/ErrorNegocio');


const globalErrorHandler = (err, req, res, next) => {
    // Si es un error de Multer
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: { message: 'Error en la carga del archivo. Verifique el tipo de archivo y el tamaño.' } });
    }
    // Si el error es de Sequelize, maneja usando ErrorHandler basico
    if (err.name && err.errors) {
        return handleControllerError(res, err, null); // Se usarian los mensajes genericos
    }

    // Verificar si el error es una instancia de ErrorNegocio
    if (err instanceof ErrorNegocio) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                type: err.type || 'UNKNOWN', // UNKNOWN como tipo por defecto
            },
        });
    }

    // Verificar si el error es de token vencido
    if(err.name == "TokenExpiredError"){
        return res.status(401).json({ error: { message: "El token enviado expiró. Inicie nuevamente sesion." } });
    }
    // Mensaje genérico para otros errores
    let msg = "Ocurrió un error inesperado." + err.errno + "-" + err.message + ". \n Intentalo de nuevo más tarde";
    return res.status(500).json({ error: { message: msg } });
};

module.exports = globalErrorHandler;
