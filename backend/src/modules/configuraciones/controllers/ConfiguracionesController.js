//Manejar las solicitudes HTTP. Llama al servicio correspondiente. Este maneja las solicitudes GET
const errorHandler = require('../../../utils/ErrorHandler');
const ConfiguracionesService = require('../services/ConfiguracionesService');
/* Metodos de consulta*/

// Obtener todas las configuraciones de informacion visible de INVERMAX
const getInfoInvermax = async (req, res) => {
    try {
        const results = await ConfiguracionesService.getInfoInvermax();
        res.status(200).json(results); //Se retornan los departamentos
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "configuraciones");
    }
};

/* Metodos actualizacion */
const updateInfoInvermax = async (req, res) => {
    try {
        const nuevosDatos = req.body; // Aquí llegan los datos enviados desde el frontend
        console.log("actualizndo");
        const configActualizada = await ConfiguracionesService.updateInfoInvermax(nuevosDatos);
        res.status(200).json(configActualizada);
    } catch (err) {
        console.log(err);
        errorHandler.handleControllerError(res, err, "configuraciones");
    }
};
module.exports = {
    getInfoInvermax,
    updateInfoInvermax
 }
 