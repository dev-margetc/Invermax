//Manejar las solicitudes HTTP. Llama al servicio correspondiente.
const ZonaService = require("../services/ZonaService");
const errorHandler = require('../../../utils/ErrorHandler')

//Traer todas las zonas
const getAllZonas = async (req, res) => {
    try {
        msg = await ZonaService.getAllZonas();
        res.status(201).json(msg); //Se retorna un mensaje si se encuentra un error
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};

module.exports = {
    getAllZonas
}