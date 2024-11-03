//Manejar las solicitudes HTTP. Llama al servicio correspondiente.

const errorHandler = require('../../../utils/ErrorHandler');
const interesadoService = require('../services/InteresadoService');

// Insertar un interesado
const registrarInteresado = async (req, res) => {
    try {
        const datos = req.body; //Datos del cuerpo de la solicitud
        msg = await interesadoService.registrarInteresado(datos.idInmueble, datos.interesado);
        res.status(201).json(msg); //Se retorna un mensaje
    } catch (err) {
        errorHandler.handleControllerError(res,err,"inmuebles");
    }
};



module.exports = {
    registrarInteresado
}; 